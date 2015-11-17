require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'
require './status'

config_file './config.yml'

status = Status.new()


get '/' do
  content_type :json

  JSON.pretty_generate({:uptime => "#{request.base_url}/uptime",
                        :stats => "#{request.base_url}/stats",
                        :processes => "#{request.base_url}/processes",
                        :alerts => "#{request.base_url}/alerts"})
end

get '/uptime' do
  content_type :json

  JSON.pretty_generate({:uptime => status.uptime,
                        :last_reboot => status.last_reboot})
end

get '/stats' do
  content_type :json

  JSON.pretty_generate(status.stats)
end

get '/processes' do
  content_type :json

  JSON.pretty_generate({:nginx => status.processes[:nginx],
                        :blog => status.processes[:blog],
                        :lux => status.processes[:lux]})
end

get '/alerts' do
  content_type :json

  JSON.pretty_generate(status.alerts)
end
