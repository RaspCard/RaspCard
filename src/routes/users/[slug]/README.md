# The User page information

## The affects of the Plugin System

## Transaction Operation

## Rollback Operation
The rollback operation is used to revert the user to a previous state. This is useful if the user has been modified in error.
The database saves every transaction effected on the user, in the state of:
- transaction, the amount of the transaction on the balance of the user
- func, the additional functionality that can be added using a plugin
For the flow of the rollback operation, the admin can make a back operation that afflicts only the last transaction and can't select a specific transaction to revert.
This is made to avoid a conflict based on the functionality of the plugin, which can be different from the one that was used when the transaction was made.

## Delete Operation