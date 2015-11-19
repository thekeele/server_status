class Status

  def initalize()
  end

  def uptime
    uptime = `uptime --pretty`
  end

  def last_reboot
    last_reboot = `last reboot -F | head -1 | awk '{print $5,$6,$7,$8,$9}'`
  end

  def vitals
    cpu = `sar -u 1 3`
    mem = `sar -r 1 3`
    io = `sar -b 1 3`

    vitals = {}
    raws = [cpu,mem,io]
    inputs = ['cpu','memory', 'io']

    i = 0
    raws.each do |raw|
      raw = raw.to_s
      stat_cat = raw.lines[2]
      stat_avg = raw.lines.last
      vitals[inputs[i]] = stat_cat + ' ' + stat_avg
      i += 1
    end

    return vitals
  end

  def processes
    nginx = `service nginx status`
    blog = `service blog status`
    lux = `service lux status`

    return {:nginx => nginx, :blog => blog, :lux => lux}
  end

  def alerts
    alerts = {}

    fail_status = `sudo fail2ban-client status`
    fail_status = fail_status.to_s
    fail_jails = fail_status.lines.last.split(',')
    fail_jails[0] = fail_jails[0].split(' ').last

    fail_jails.each do |jail|
      jail = jail.chomp

      if jail.include? '-'
        jail = jail.split('-')[1]
      end

      status = `sudo fail2ban-client status #{jail}`
      cur_ban = status.lines[6].chomp
      total_ban = status.lines[8].chomp
      total_fail = status.lines[4].chomp
      puts "#{jail}#{cur_ban}#{total_ban}#{total_fail}"
      alerts[jail] = cur_ban + ' ' + total_ban + ' ' + total_fail
    end

    return alerts
  end
end
