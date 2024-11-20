# Discrete Learn

**Discrete Learn** is an online learning platform designed to help students master discrete mathematics, with a focus on **sets**. The platform provides interactive lessons and quizzes to make learning engaging and effective.

---

## 🚀 Features

- 📘 **Comprehensive Lessons**: Step-by-step guides covering the basics and advanced concepts of sets.
- 📝 **Interactive Quizzes**: Practice problems to test understanding and reinforce learning.
- 📊 **Progress Tracking**: Visual indicators to monitor lesson completion.
- 💻 **Responsive Design**: Optimized for both desktop and mobile devices.
- 🔄 **Streamlined Navigation**: Dedicated course pages with a focused learning environment.

---

## 🛠️ Technologies Used

- **Frontend**: React.js with [Vite](https://vitejs.dev/) for a fast and modern development setup.
- **State Management**: Context API for user progress and app state.
- **UI Components**: Built with [ShadCN UI](https://shadcn.dev/) for a sleek and consistent interface.
- **Backend**: [Firebase](https://firebase.google.com/) for data storage and authentication.

---

## 📂 Project Structure


- **`src/`**: Contains all the source files and main logic of the application.
  - **`components/`**: Houses reusable UI components such as the header, sidebar, and footer.
    - **`Courses/`**
      * **`sidebar/`**
        - `LessonContent.tsx`
        - `ScrolableSideBar.tsx`
        - `Sidebar.tsx`
        - `StatisticSidebar.tsx`
      * `CourseContent.tsx`
      * `FooterCourse.tsx`
    - **`headers/`**
      * `NavHeader.tsx`
    - **`ui/`**: contain all the i components from shadcn ui
    - `Sidebar.jsx`: Manages navigation between lessons.
    - `Header.jsx`: Displays the global header for the platform.
    - `Footer.jsx`: Includes navigation controls and additional information.
  - **`constants/`**: Stores centralized configurations and data used across the app.
    - `aboutConstants.tsx`: About data
    - `coursesConstants.tsx`: Main courses details
    - `headerConstants.tsx`: Header data
    - `lessonContent.tsx`: loading the lessons contents from the json file
    - `problems.tsx`: Practice problems data
    - `resources.tsx`: data for external resources
  - **`pages/`**: Contains pages for routing and content display.
    - **`auth/`**
      * `Login.tsx`
      * `passwordReset.tsx`
      * `SignUp.tsx`
    - **`courses/`**
      * `CoursePage.tsx`
    - **`interactions/`**
      * `ComputerRepresentation.tsx`
      * `Interactions.tsx`
      * `InteractiveVennDiagram.tsx`
      * `SetIdentityPractice.tsx`
      * `TableOfOperations.tsx`
      * `VennDiagram.tsx`
    - **`problems/`**
      * `ProblemCard.tsx`
      * `SolvedProblemCard.tsx`
    - **`profiles`**
      * `EditProfile.tsx`
      * `Profile.tsx`
      * `ProfileHeader.tsx`
    - `About.tsx`: About page
    - `Contact.tsx`: Contact page
    - `Courses.tsx`: Handles course-specific content, including lessons and modules.
    - `Help.tsx`: Help page
    - `Home.jsx`: Displays the landing page with an overview of available courses.
    - `Problems.tsx`: problems page
    - `Progress.tsx`: progress page
    - `Resources.tsx`: resources page
    - `Settings.tsx`: Account Settings page
  - **`router/`**
    - `routes.tsx`: routes of the applications
  - **`utils`**
    - `authUtils.tsx`
  - `App.css`
  - `App.js`: The main React application component.
  - `index.css`
  - `main.jsx`: The entry point of the application, rendering the root component.

- **`public/`**: Static assets such as images and icons used in the application.

- **`package.json`**: Contains project metadata, dependencies, and scripts for building and running the app.

- **`README.md`**: This documentation file.

---

This structure ensures the codebase is modular, maintainable, and easy to navigate.


---

## ⚙️ Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/discrete-learn.git
   ```

2. Navigate to the project directory:
```bash
cd discrete-learn
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to [http://localhost:5173](http://localhost:517)

## 📖 Usage
1. Navigate to the homepage to explore the available lessons.
2. Click on a course to open its dedicated course page.
3. Use the sidebar to switch between lessons and track your progress.
4. Take quizzes after each lesson to test your understanding.
5. Review your progress and completed lessons on the dashboard.
6. Reach out to the support team for any questions or concerns.

## ✨ Features in Detail
### Course Pages
* `Static Sidebar`: Navigate through lessons easily without losing context.
* `Dynamic Content`: Lessons are dynamically loaded based on user selection.
* `Next Button`: Seamlessly move through lessons in order.
* `Back to Lesson Button`: Go back to previous lessons at any time
* `Completed button`: Mark lessons as completed for easy tracking

### Progress Tracking
* `Completion Indicators`: Easily track lessons you’ve completed.
* `Highlighted Current Lesson`: Always know where you are in the course.

### Interactive Quizzes
* `Real-time Feedback`: Get immediate feedback on your answers.
* `Engaging Formats`: Multiple-choice and short-answer questions.

## 🛠️ Future Enhancements
* Expanding content to include other discrete mathematics topics, such as:
  * Propositions
  * Boolean algebra
* Graph theory
* Adding a leaderboard to encourage student competition.
* Introducing gamification features like badges and rewards.


## 🤝 Contributing
We welcome contributions to make Discrete Learn even better! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
```bash
git checkout -b feature-name
```
3. Commit your changes and push to your branch:
```bash
git commit -m "Add feature-name"
```
4. Push to branch
```bash
git push origin feature-name
```
5. Open a pull request, and we’ll review it promptly.

## 📄 License
This project is licensed under the MIT License. See the LICENSE file for details.

## 🛡️ Acknowledgements
* `Vite` for a fast development setup.
* `ShadCN UI` for beautifully styled components.
* `Firebase` for backend support.
