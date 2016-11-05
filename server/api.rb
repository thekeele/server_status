#!/usr/bin/env ruby

## use RACK_ENV environment or default to development
ENV['RACK_ENV'] ||= 'development'

# sinatra / ruby libs, sinatra/base required for modular style
require 'sinatra/base'
require 'sinatra/config_file'
require 'sinatra/reloader'
require 'json'

# relative paths to user written libs
require_relative 'routes/routes'

# modular style app, inherits from Sinatra Base
class StatusAPI < Sinatra::Base
  # register and load yaml config file
  register Sinatra::ConfigFile
  config_file 'config.yml'

  # set the root dir of the app
  set :root, settings.root

  # development, test specific settings
  configure :development, :test do
    enable :logging
    register Sinatra::Reloader

    # loaded from config.yml
    set :bind, settings.development[:bind]
    set :port, settings.development[:port]
    set :run, settings.development[:run]
    set :server, settings.development[:server]
  end

  # production specific settings
  configure :production do
    enable :logging

    # loaded from config.yml
    set :bind, settings.production[:bind]
    set :port, settings.production[:port]
    set :run, settings.production[:run]
    set :server, settings.production[:server]

    def self.run!
      super do |server|
        server.ssl = true
        server.ssl_options = {
          :cert_chain_file => File.dirname(__FILE__) + "",
          :private_key_file => File.dirname(__FILE__) + "",
          :verify_peer => false
        }
      end
    end
  end

  # register Routes module with Sinatra
  register Sinatra::StatusAPI::Routes

  # start the server if ruby file executed directly
  run! if app_file == $0
end
