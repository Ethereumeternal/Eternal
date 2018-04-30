# Ethereum Classic Client Restoration

Issue discussing Client Restoration https://github.com/ethereumproject/volunteer/issues/19

This project is to help community developers coordinate and standardize our client restoration process so we quickly implement the best solution.

This file can link to associated issues and be a place to aggregate
conclusions on the best ways to restore the Ethereum clients to work
with the original/classic chain.

## Associated Issues

**General Restoration Issues**

https://github.com/ethereumproject/pyethereum/issues/6

https://github.com/ethereumproject/go-ethereum/issues/9

https://github.com/ethereumproject/go-ethereum/issues/7

**Bootstrap Nodes**

https://github.com/ethereumproject/volunteer/issues/20

https://github.com/ethereumproject/go-ethereum/issues/4

## Proposed Steps

Leave project names the same unless there are namespace issues so the ETC clients remain easily compatible with existing documentation.

1. Remove all DAO specific code
2. Update bootstrap nodes
3. Add checkpoint at fork
4. Disconnect with ETF peers 

*If you have time please provide elaborate and provide additional
details.*

## Client Distribution

The following public key is being used to sign pre-built binaries:

[eric.somdahl@ethereumclassic.org](code_signing.asc)

This key can also be retrieved from this URL:
[https://api.bintray.com/orgs/ethereumproject/keys/gpg/public.key](https://api.bintray.com/orgs/ethereumproject/keys/gpg/public.key)

[I affirm that I control the above keypair](message.txt.asc)

# Bomb Defusal

Bomb defusal organization is currently being organized in the following
project:

https://github.com/ethereumproject/volunteer/tree/master/Difficulty-Bomb-Defusal
