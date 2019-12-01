# SESE Website Playbook

This repository contains the Ansible Playbook we use to configure our Website
Server.


## Running the Playbook

You need `ansible` installed to run this playbook. The `ansible.cfg` in this
repository will attempt to SSH into the server as your current user and will
prompt for your `sudo` password.

Sensitive playbook-variables are stored in the `group_vars/all/vault` file. You
can edit this file with our vault password by running `ansible-vault edit
group_vars/all/vault`. For convenience, you can put the vault password in a
`vault-password` file in this folder to prevent ansible from prompting you for
the password. A `.gitignore` rule will prevent checking the password file into
the repository.

To run the playbook, simple run `ansible-playbook playbook.yaml`. By default,
the playbook will run against a local VM that is expected to have a DNS name of
`sese-www-test.acorn`. Before running the playbook, you should ensure that the
VM is running and you're computer will resolve the domain name to it. You can
edit your `/etc/hosts` file to point the domain to your VMs IP if you do not
have access to a DNS server.

To run the playbook against our `staging` or `production` hosts, you must pass
the host or group name to the `ansible-playbook` command:

```sh
ansible-playbook --extra-vars "host=staging" playbook.yaml
```


## Tasks

TODO: give overview of tasks


## License

GPL-3.0
