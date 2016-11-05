require 'sinatra/base'
require_relative '../class/status'

# nested modules based on register in api.rb
module Sinatra
  module StatusAPI
    module Routes
      # define a function that's registered as the app from api.rb
      def self.registered(app)

        status = Status.new()

        # before any request is processed, run this block
        app.before do
          content_type "application/json"

          # CORS requests come in as OPTIONS, set headers on OPTIONS
          if request.request_method == 'OPTIONS'
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Allow-Methods"] = "GET"
            response.headers["Access-Control-Allow-Headers"] = "Content-Type"

            halt 200
          end

          response.headers["Access-Control-Allow-Origin"] = "*"
        end

        app.get '/' do
          JSON.pretty_generate({:uptime => "#{request.base_url}/uptime",
                                :vitals => "#{request.base_url}/vitals",
                                :processes => "#{request.base_url}/processes",
                                :alerts => "#{request.base_url}/alerts"})
        end

        app.get '/uptime' do
          JSON.pretty_generate({:uptime => status.uptime,
                                :last_reboot => status.last_reboot})
        end

        app.get '/vitals' do
          JSON.pretty_generate(status.vitals)
        end

        app.get '/processes' do
          JSON.pretty_generate(status.processes)
        end

        app.get '/alerts' do
          JSON.pretty_generate(status.alerts)
        end
      end
    end
  end
end
