## Interview Task
Create a node.js server using express.js and javascript/typescript.
Setup a postgresql/mysql database.

### Functionality Required in the Application:
- The app allows a potential customer to sign up to the waiting list with his email address. (he will see a screen with an email address)
- As soon as he signs up, his position in the waiting list will be displayed. (The first customer gets the default number of 99. When the next customer signs up, his waiting list position is 100)
- Once he signed up for the waiting list, he will get a unique referral link.
He can share this link to his friends.
- If their friends sign up using his referral link, he will "move up" by 1 place in his position (Example: John has joined the wait list at position: 120. He referred to 10 of his friends. When they joined, John's position will go to 110)
- Once a customer reaches Position 1, he will receive an email with a coupon code to purchase the new product.

### API's Need to Build
- Signup - (with or without referral Code)
- Login
- Get User with (referral code and wait position)
