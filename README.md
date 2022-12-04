# File structure

### Modules:

> Consolidate domain logic.
> I used to this structure to better manage and handle code updates and isolate responsibilities

- Repo: logic layer that interact with the database
- Resolver: logic that that interacts with graphql
- Service: logic layer that handles business logic by validating, handling data, implementing repo logic, and exported to the resolver

### Helper

- QuestionContext: Handle and manage different question types logic

- Validation: Contain validate logic and validate them
  - A one source for validation across the app
  - Made it easy to mock the validation

### Utils

- Add auth path management for context

# Test

- Add helper implement share logic across unit and e2e tests (eg. mocks, seeding, etc)
- Add utils to handle test setup and typing

# Database

- Add seeding for user, questionnaire, and questions
- Ownership relationship to questions
  - I added this to handle faster validation for update and delete
  - For seeding, I have to individually seed each table

# Config

- Update tsconfig and jestConfig to use relative paths
- Add graphql-tools to merge resolvers and schemas

# Notes

- Used to [Trello](https://trello.com/invite/b/K2n4vgW3/ATTI0817dc3bd645469fd838510c91dd92e1FB730CBD/fueled-interview-task) for task management
- Created [UML diagram](https://drive.google.com/file/d/1nAzJaukTOJL7XU26cbZmVMaF2PAcHdta/view?usp=sharing)

> Remark: This was a fun interview program. I enjoy the amount of freedom. Even when took me a bit to figure what to do.
