require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'
require 'status'

config_file './config.yml'

content_type :json

status = Status.new()


get '/uptime' do
  JSON.pretty_generate({:uptime => status.uptime,
                        :last_reboot => status.last_reboot})
end

get '/stats' do
  JSON.pretty_generate(status.stats)
end

get '/processes' do
  JSON.pretty_generate({:nginx => status.processes[:nginx],
                        :blog => status.processes[:blog],
                        :lux => status.processes[:lux]})
end

get '/alerts' do
  JSON.pretty_generate(status.alerts)
end
