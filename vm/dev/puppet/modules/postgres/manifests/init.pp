# == Class: postgres
#
# Performs initial configuration tasks for all Vagrant boxes.
#

class postgres {

    class { 'postgresql::server':
       ensure                     => 'present',
       ip_mask_deny_postgres_user => '0.0.0.0/32',
       ip_mask_allow_all_users    => '0.0.0.0/0',
       listen_addresses           => '*',
       manage_firewall            => false,
       postgres_password          => 'foo',
       manage_pg_hba_conf         => true,
    }

    postgresql::server::db { 'director':
      user     => 'director',
      password => postgresql_password('director', 'admin'),
    }
}
