require 'json'
require 'rest-client'

response = RestClient.get('http://localhost:9000')
puts response

response = RestClient.get('http://localhost:9000/hiphop')
puts response
