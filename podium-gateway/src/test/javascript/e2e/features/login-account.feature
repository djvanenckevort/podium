Feature: All users have to login. (BRPREQ-2, BRPREQ-4)

    @default
    Scenario Outline: every role is able to login
        Given <user> goes to the 'sign in' page
        When he attempts to login
        Then he is on the '<landingpage>' page

        Examples:
            | user        | landingpage      |
            | Admin       | user management  |
            | BBMRI_Admin | user management  |
            | Linda       | request overview |

    @default
    Scenario: failing to login locks the account
        Given Dave goes to the 'sign in' page
        When he attempts to login incorrectly '5' times
        And he attempts to login
        Then he is locked out

    @default
    Scenario: users can edit their account profile
        Given Linda goes to the 'profile' page
        When he edits the details 'firstName, lastName, department, jobTitle'
        Then the new details are saved

    @default
    Scenario: some fields in a user's profile cannot be edited
        Given Linda goes to the 'profile' page
        Then the fields 'institute' are not editable

    @default
    Scenario: register a new user
        Given Simone goes to the 'registration' page
        When she registers for a new account
        Then an account is created

    @default
    Scenario: all fields are mandatory to register a new user
        Given Simone goes to the 'registration' page
        When she forgets to fill a field in the registration form
        Then she is not registered
