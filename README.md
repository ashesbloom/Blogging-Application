# [Blogging Application](http://blogs.ap-south-1.elasticbeanstalk.com/)

A blogging application with a clean and minimal UI featuring dark mode, an adaptive sidebar, and many easter eggs for users to discover. [Blogs!](http://blogs.ap-south-1.elasticbeanstalk.com/)

## Features

- **Clean and Minimal UI:** The application boasts a sleek design with a dark mode for comfortable reading.
- **Adaptive Sidebar:** The sidebar adapts to user interactions, enhancing the browsing experience.
- **Easter Eggs:** Hidden features and surprises for users to find as they explore.
- **HTML in Blogs:** Users can embed HTML code within their blogs using `[text] your code [/text]` blocks.
- **Post Progress:** Users can see the progress of their posts beside the adaptive sidebar.
- **Read Time Calculation:** The estimated read time is displayed below the thumbnail of each post.

## Technologies Used

- **Node.js:** Server-side JavaScript runtime.
- **Express:** Web framework for Node.js.
- **MongoDB:** NoSQL database.
- **Dependencies:**
  - **Multer:** File handling and restrictions.
  - **cookie-parser:** Cookie handling.
  - **jsonwebtoken (JWT):** Token generation and verification.
  - **EJS:** Templating engine.

## Security and Privacy

- **Password Hashing:** Passwords are hashed with the SHA-256 algorithm and never saved in the database.
- **JWT Authentication:** Efficient login and logout handling through JWT token generation and verification.

## File Handling

- **Multer:** Used for restricting and handling file attachments.

## Installation

To set up the project locally, follow these steps:

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/ashesbloom/Blogging-Application/
   cd Blogging-Application
   ```
   
2. **Initialize Node.js**

    ```sh
    npm init
    ```

    Follow the prompts to create a `package.json` file.

2. **Install Express**

    ```sh
    npm install express
    ```

3. **Install Other Dependencies**

    ```sh
    npm install multer cookie-parser jsonwebtoken ejs
    ```

4. **Run the Application**

    ```sh
    node index.js
    ```

## Custom Middleware / Features

- **HTML Code in Blogs**: Users can embed HTML code within their blog posts using `[text] your code [/text]` blocks.
- **Post Progress**: Users can track the progress of their posts in real time.
- **Read Time Calculation**: The application calculates and displays the read time of each post.

## Contributing

If you want to contribute to the project, please follow the standard GitHub flow:

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a pull request.

## Contact

For any inquiries or issues, contact us at [mayankpandeydk123@gmail.com](mailto:mayankpandeydk123@gmail.com).
