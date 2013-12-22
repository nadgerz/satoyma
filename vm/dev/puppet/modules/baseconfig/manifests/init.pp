# == Class: baseconfig
#
# Performs initial configuration tasks for all Vagrant boxes.
#
class baseconfig {
  # exec { 'apt-get update':
  #   command => '/usr/bin/apt-get update';
  # }

  # host { 'hostmachine':
  #   ip => '192.168.0.1';
  # }

  package { "firefox": 
    ensure => present, }

  package { ["zip", "unzip", "tar", "ncftp" ]: 
    ensure => present, 
  }

#  package { [ "openssl-devel", "libxml2-devel", "libxslt-devel", "libcurl-devel" ]: 
#    ensure => present, 
#  }
  
  package { [ "ImageMagick" ]: 
    ensure => present, 
  }
  
  package { [ "java-1.7.0-openjdk-devel" ]: 
    ensure => present, 
  }
  
  package { [ "doxygen", "graphviz.x86_64", "graphviz-doc.x86_64", "graphviz-graphs.x86_64" ]: 
    ensure => present, 
  }

  file {
    '/home/vagrant/.bashrc':
      owner => 'vagrant',
      group => 'vagrant',
      mode  => '0644',
      source => 'puppet:///modules/baseconfig/bashrc';
  }

  file {
    '/home/vagrant/.gitconfig':
      owner => 'vagrant',
      group => 'vagrant',
      mode  => '0644',
      source => 'puppet:///modules/baseconfig/.gitconfig';
  }
}

class ntp {
    package { 'ntp':
        ensure => installed,
    }


    service { 'ntp':
        name       => 'ntpd',
        ensure     => 'running',
        enabled    => true,
        subscribe  => File['ntp.conf'],
    }

    exec { 
            "/usr/sbin/ntpdate ntp.ubuntu.com":
                alias => "ntpdate",
                require => Service["ntp"];
    }
}
