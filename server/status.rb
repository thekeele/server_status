class Status

  def initalize()
  end

  def uptime
    uptime = `uptime --pretty`
    uptime[0] = 'U'
    return uptime
  end

  def last_reboot
    last_reboot = `last reboot -F | head -1 | awk '{print $5,$6,$7,$8,$9}'`
    last_reboot = last_reboot.split(' ')
    last_reboot = last_reboot[0] + ' @ ' + last_reboot[3]
    return last_reboot
  end

  def vitals
    cpu = `sar -u 1 5`
    mem = `sar -r 1 5`
    io = `sar -b 1 5`

    cpu = get_avg_line(cpu)
    mem = get_avg_line(mem)
    io = get_avg_line(io)

    vitals = {}
    vitals[:cpu] = get_cpu_avg(cpu)
    vitals[:mem] = get_mem_avg(mem)
    vitals[:io] = get_io_avg(io)
    return vitals
  end

  def processes
    nginx = `service nginx status`
    blog = `service blog status`
    lux = `service lux status`

    nginx = nginx.to_s
    nginx = nginx.split(' ')
    nginx = nginx[1] + ' ' + nginx[3]

    blog = blog.to_s.chomp

    lux = lux.to_s.chomp

    processes = {}
    processes[:nginx] = nginx
    processes[:blog] = blog
    processes[:lux] = lux
    return processes
  end

  def alerts
    alerts = {}

    fail_status = `sudo fail2ban-client status`
    fail_status = fail_status.to_s
    fail_jails = fail_status.lines.last.split(',')
    fail_jails[0] = fail_jails[0].split(' ').last

    fail_jails.each do |jail|
      jail = jail.chomp.lstrip
      status = `sudo fail2ban-client status #{jail}`
      cur_ban = status.lines[6]
      total_ban = status.lines[8]
      total_fail = status.lines[4]
      puts "#{jail}#{cur_ban}#{total_ban}#{total_fail}"

      if jail.include? '-'
        jail = jail.split('-')[1]
      end

      alerts[jail] = cur_ban + ' ' + total_ban + ' ' + total_fail
    end

    return alerts
  end

  private

  def get_avg_line(vital)
    vital = vital.to_s
    vital = vital.lines.last.split(' ')
    return vital
  end

  def get_cpu_avg(cpu)
    cpu_average = {}
    cpu_average[:user_percent] = cpu[2]
    cpu_average[:system_percent] = cpu[4]
    cpu_average[:idle_percent] = cpu[7]
    return cpu_average
  end

  def get_mem_avg(mem)
    mem_average = {}
    mem_average[:kb_free] = mem[1]
    mem_average[:kb_used] = mem[2]
    mem_average[:percent_used] = mem[3]
    return mem_average
  end

  def get_io_avg(io)
    io_average = {}
    io_average[:trans_per_sec] = io[1]
    io_average[:read_per_sec] = io[2]
    io_average[:write_per_sec] = io[3]
    return io_average
  end
end
