class iptables {
  
  service {'iptables':
    ensure => false,
  }

  service {'firewalld':
    ensure => false,
  }
}
