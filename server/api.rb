#!/usr/bin/env ruby

require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'
require_relative 'status'

config_file './config.yml'

configure :development, :test do
  enable :logging
end

status = Status.new()

before do
  content_type :json

  headers 'Access-Control-Allow-Origin' => '*',
          'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
end

set :protection, false

get '/' do
  JSON.pretty_generate({:uptime => "#{request.base_url}/uptime",
                        :vitals => "#{request.base_url}/vitals",
                        :processes => "#{request.base_url}/processes",
                        :alerts => "#{request.base_url}/alerts"})
end

get '/uptime' do
  JSON.pretty_generate({:uptime => status.uptime,
                        :last_reboot => status.last_reboot})
end

get '/vitals' do
  JSON.pretty_generate(status.vitals)
end

get '/processes' do
  JSON.pretty_generate(status.processes)
end

get '/alerts' do
  JSON.pretty_generate(status.alerts)
end
