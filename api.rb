require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'

config_file './config.yml'

get '/' do
  content_type :json

  greetings = {}
  greetings = {:english => 'hello world', :spanish => 'hola mundo'}
  greetings = JSON.pretty_generate(greetings)

  return greetings
end

get '/hiphop' do
  content_type :json

  greetings = {}
  greetings = {:hip => 'proud stumble', :hop => 'yuk the world'}
  greetings = JSON.pretty_generate(greetings)

  return greetings
end
