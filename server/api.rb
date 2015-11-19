require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'
require './status'

config_file './config.yml'

status = Status.new()

before do
  content_type :json

  headers 'Access-Control-Allow-Origin' => '*',
            'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
end

set :protection, false

get '/' do
  # content_type :json

  JSON.pretty_generate({:uptime => "#{request.base_url}/uptime",
                        :vitals => "#{request.base_url}/vitals",
                        :processes => "#{request.base_url}/processes",
                        :alerts => "#{request.base_url}/alerts"})
end

get '/uptime' do
  # content_type :json

  JSON.pretty_generate({:uptime => status.uptime,
                        :last_reboot => status.last_reboot})
end

get '/vitals' do
  # content_type :json

  JSON.pretty_generate(status.vitals)
end

get '/processes' do
  # content_type :json

  JSON.pretty_generate({:nginx => status.processes[:nginx],
                        :blog => status.processes[:blog],
                        :lux => status.processes[:lux]})
end

get '/alerts' do
  # content_type :json

  JSON.pretty_generate(status.alerts)
end
