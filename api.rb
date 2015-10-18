require 'sinatra'
require 'sinatra/config_file'
require 'sinatra/reloader' if development?
require 'json'

config_file './config.yml'

get '/uptime' do
  content_type :json

  uptime = `uptime`
  last_reboot = `last reboot -F | head -1 | awk '{print $5,$6,$7,$8,$9}'`

  JSON.pretty_generate({:uptime => uptime, last_reboot: last_reboot})
end

get '/stats' do
  content_type :json

  cpu = `sar -u 1 3`
  mem = `sar -r 1 3`
  io = `sar -b 1 3`

  stats = {}
  raws = [cpu,mem,io]

  raws.each do |raw|
    raw = raw.to_s
    stat_cat = raw.lines[2]
    stat_avg = raw.lines.last
    stats[raw] = stat_cat + ' ' + stat_avg
  end

  JSON.pretty_generate(stats)
end

get '/processes' do
  content_type :json

  nginx = `service nginx status`
  blog = `service blog status`
  lux = `service lux status`

  JSON.pretty_generate({:nginx => nginx, :blog => blog, :lux => lux})
end

get '/alerts' do
  content_type :json

  alerts = {}

  fail_status = `sudo fail2ban-client status`
  fail_status = fail_status.to_s
  fail_jails = fail_status.lines.last.split(',')
  fail_jails[0] = fail_jails[0].split(' ').last

  fail_jails.each do |jail|
    jail = jail.chomp
    status = `sudo fail2ban-client status #{jail}`
    cur_ban = status.lines[6].chomp
    total_ban = status.lines[8].chomp
    total_fail = status.lines[4].chomp
    puts "#{jail}#{cur_ban}#{total_ban}#{total_fail}"
    alerts[jail] = cur_ban + ' ' + total_ban + ' ' + total_fail
  end

  JSON.pretty_generate(alerts)
end
