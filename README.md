# SESE Website Playbook

This repository contains the Ansible Playbooks we use to configure our Website
Server & to deploy the lastest Website Code.


## Running the Playbooks

You need `ansible` installed to run this playbook. The `ansible.cfg` in this
repository will attempt to SSH into the server as your current user and will
prompt for your `sudo` password.

Sensitive playbook-variables are stored in the `group_vars/all/vault` file. You
can edit this file with our vault password by running `ansible-vault edit
group_vars/all/vault`. For convenience, you can put the vault password in a
`vault-password` file in this folder to prevent ansible from prompting you for
the password. A `.gitignore` rule will prevent checking the password file into
the repository.

To run a playbook, simple run `ansible-playbook <playbook-name>.yaml`. By
default, the playbooks will run against a local VM that is expected to have a
DNS name of `sese-www-test.acorn`. Before running the playbook, you should
ensure that the VM is running and your computer will resolve the domain name
to it. You can edit your `/etc/hosts` file to point the domain to your VMs IP
if you do not have access to a DNS server, or edit the `hosts.yaml` file to
point to the proper domain or IP address.

To run a playbook against our `staging` or `production` hosts, you must pass
the host or group name to the `ansible-playbook` command via the `host`
variable:

```sh
ansible-playbook --extra-vars "host=staging" playbook-configure.yaml
```


## Configuration Playbook

`playbook-configure.yaml` is the playbook responsible for configuring a server.

The playbook will:

* Install basic sysadmin tools
* Install Docker
* Setup user account `sese` for administrators
* Enable unattended package upgrades for security updates
* Harden the SSH server
* Configure the ufw firewall
* Install nginx & configure it to proxy the backend and frontend running in Docker containers with ports exposed to `localhost`
* Install & configure certbot for generating nginx's SSL certificates
* Setup a local Prerender instance with Docker container to handle server side rendering
  for web crawlers and bots


## Deployment Playbook

`playbook-deploy.yaml` is the playbook responsible for deploying the lastest
`master` branch of our repository to a server. It assumes that the
configuration playbook has already been run on the server at least once.

The deployment playbook will:

* Reset the repository on the server.
* Pull the specified commit.
* Bring up Docker compose configuration

E.g.
```
ansible-playbook --extra-vars "host=staging" --extra-vars "commit=<sha>" playbook-deploy.yaml -u sese
```

Make sure to use commits from `master` branch for `production` updates, and `develop` branch for `staging` updates
since the frontend image is built using the corresponding env variables.

## License

GPL-3.0
