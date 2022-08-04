### What?
I've added support for authentication to implement Key Result 2 of OKR1. It includes 
model, table, controller and test. For more background
### Why?
These changes complete the user login and account creation experience.
### How?
This includes a migration, model and controller for user authentication. I'm using Devise to do the heavy lifting. I ran Devise migrations and those are included here.
### Testing?
I've added coverage for testing all new methods. I used Faker for a few random user emails and names.
### Screenshots (optional)
0
### Anything Else?
Let's consider using a 3rd party authentication provider for this, to offload MFA and other considerations as they arise and as the privacy landscape evolves. AWS Cognito is a good option, so is Firebase. I'm happy to start researching this path. Let's also consider breaking this out into its own service. We can then re-use it or share the accounts with other apps in the future.
