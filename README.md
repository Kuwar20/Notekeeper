# Notekeeper Application

A simple note-keeping application inspired by Google Keep. Users can add, update, delete, and pin notes. The application is built using **React** and styled with **Tailwind CSS**. Notes are stored in a backend database and fetched dynamically. Pagination is implemented to display a maximum of 6 notes per page.

---

## **Features**
1. **Add Notes**:
   - Each note includes a title, tagline, and body.
   - Form validation ensures all fields are filled before submission.

2. **Edit Notes**:
   - Existing notes can be edited via a pop-up form.

3. **Delete Notes**:
   - Notes can be permanently removed.

4. **Pin Notes**:
   - Pinned notes always appear at the top, regardless of creation or update time.

5. **Pagination**:
   - The grid layout displays up to 6 notes per page.
   - Users can navigate between pages using `Previous` and `Next` buttons.

6. **Responsive Design**:
   - The UI is fully responsive and mobile-friendly.

7. **Notifications**:
   - Success or error messages are displayed after each action.

---

## **Live Demo**
[Click here to view the live application](https://notekeeper-liard.vercel.app/)

## **Tech Stack**
- **Frontend**: React, Tailwind CSS
- **Backend**: Supabase (SQL Database)

---

## **Installation**

### **Prerequisites**
- Node.js installed
- Supabase account (or replace with your preferred SQL database)

### **Steps**
1. Clone the repository:
   ```bash
   git clone hhttps://github.com/Kuwar20/Notekeeper.git
   ```
   2. Navigate to the project directory:

   ```bash
     cd notekeeper
    ```
   
3. install the dependencies:
      ```bash
   npm install
    ```
4. Run the app in development mode:
      ```bash
    npm run dev
    ```

    #Folder Structure

    ```bash
     src/
      │
      ├── components/
      │   ├── NoteForm.jsx      # Form to add/edit notes
      │   ├── NoteCard.jsx      # Individual note cards
      │   ├── Pagination.jsx    # Pagination controls
      │   └──Notification.jsx   # Notification component
      │
      ├── utils/
      │   └── supabase.js       # Supabase service layer
      │
      ├── App.js                # Main application logic
      └── index.js              # Entry point

    ```