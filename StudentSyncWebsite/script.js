document.addEventListener("DOMContentLoaded", function() {
    // Get Current Date Snd Time From System
    function updateTime() {
        const now = new Date();
        const datetime = document.getElementById("datetime");
        datetime.textContent = now.toLocaleString();
    }
    setInterval(updateTime, 1000);
    // Creation And Removal Of Popups
    function showPopup(popupId) {
        document.getElementById(popupId).style.display = "block";
    }
    function hidePopup(popupId) {
        document.getElementById(popupId).style.display = "none";
    }
    document.querySelectorAll(".close").forEach(button => {
        button.onclick = function() {
            hidePopup(button.closest(".popup").id);
        }
    });
    // Settings Page Scripts
    if (window.location.pathname.endsWith("settings.html")) {
        const subjectsTable = document.getElementById("subjects-table");
        const addSubjectBtn = document.getElementById("add-subject-btn");
        const saveSubjectBtn = document.getElementById("save-subject-btn");
        // Create The Subject Table
        function loadSubjects() {
            const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            subjectsTable.innerHTML = `
                <tr>
                    <th>Subject</th>
                    <th>Teacher</th>
                    <th>Remove</th>
                </tr>`;
            subjects.forEach((subject, index) => {
                const row = subjectsTable.insertRow();
                row.innerHTML = `
                    <td>${subject.name}</td>
                    <td>${subject.teacher}</td>
                    <td><button onclick="removeSubject(${index})">✖</button></td>`;
            });
        }
        // Handles The Input And Storage Of Data Put Into The Add Subject Popup
        function addSubject() {
            const subject = document.getElementById("subject-input").value;
            const teacher = document.getElementById("teacher-input").value;
            if (subject && teacher) {
                const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
                subjects.push({ name: subject, teacher: teacher });
                localStorage.setItem("subjects", JSON.stringify(subjects));
                loadSubjects();
                hidePopup("subject-popup");
            }
        }
        // Removes The Subject From Storage on Button Press
        window.removeSubject = function(index) {
            const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            subjects.splice(index, 1);
            localStorage.setItem("subjects", JSON.stringify(subjects));
            loadSubjects();
        }
        // Handles Button Presses And Page Loading
        addSubjectBtn.onclick = () => showPopup("subject-popup");
        saveSubjectBtn.onclick = addSubject;
        loadSubjects();
    }
    // Marks Page Scripts
    if (window.location.pathname.endsWith("marks.html")) {
        const marksTable = document.getElementById("marks-table");
        const addMarkBtn = document.getElementById("add-mark-btn");
        const saveMarkBtn = document.getElementById("save-mark-btn");
        // Creates The Marks Table
        function loadMarks() {
            const marks = JSON.parse(localStorage.getItem("marks")) || [];
            marksTable.innerHTML = `
                <tr>
                    <th>Subject</th>
                    <th>Task Name</th>
                    <th>Weighting</th>
                    <th>Your Marks</th>
                    <th>Total Marks</th>
                    <th>Percentage</th>
                    <th>Remove</th>
                </tr>`;
            marks.forEach((mark, index) => {
                const row = marksTable.insertRow();
                const percentage = ((mark.yourMarks / mark.totalMarks) * 100).toFixed(2);
                row.innerHTML = `
                    <td>${mark.subject}</td>
                    <td>${mark.taskName}</td>
                    <td>${mark.weighting}</td>
                    <td>${mark.yourMarks}</td>
                    <td>${mark.totalMarks}</td>
                    <td>${percentage}%</td>
                    <td><button onclick="removeMark(${index})">✖</button></td>`;
            });
        }
        // Handles The Input And Storage Of Data Put Into The Add Mark Popup
        function addMark() {
            const subject = document.getElementById("subject-select").value;
            const taskName = document.getElementById("task-name-input").value;
            const weighting = document.getElementById("weighting-input").value;
            const yourMarks = document.getElementById("mark-received-input").value;
            const totalMarks = document.getElementById("total-marks-input").value;
            if (subject && taskName && weighting && yourMarks && totalMarks) {
                const marks = JSON.parse(localStorage.getItem("marks")) || [];
                marks.push({
                    subject: subject,
                    taskName: taskName,
                    weighting: weighting,
                    yourMarks: yourMarks,
                    totalMarks: totalMarks
                });
                localStorage.setItem("marks", JSON.stringify(marks));
                loadMarks();
                hidePopup("mark-popup");
            }
        }
        // Removes The Mark From Storage on Button Press
        window.removeMark = function(index) {
            const marks = JSON.parse(localStorage.getItem("marks")) || [];
            marks.splice(index, 1);
            localStorage.setItem("marks", JSON.stringify(marks));
            loadMarks();
        }
        // Handles Button Presses And Page Loading
        addMarkBtn.onclick = () => showPopup("mark-popup");
        saveMarkBtn.onclick = addMark;
        loadMarks();
    }
    // Assignments Page Scripts
    if (window.location.pathname.endsWith("assignments.html")) {
        const assignmentsTable = document.getElementById("assignments-table");
        const addAssignmentBtn = document.getElementById("add-assignment-btn");
        const saveAssignmentBtn = document.getElementById("save-assignment-btn");
        // Creates The Assignments Table
        function loadAssignments() {
            const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
            assignmentsTable.innerHTML = `
                <tr>
                    <th>Subject</th>
                    <th>Task Name</th>
                    <th>Weighting</th>
                    <th>Due Date</th>
                    <th>Remove</th>
                </tr>`;
            assignments.forEach((assignment, index) => {
                const row = assignmentsTable.insertRow();
                row.innerHTML = `
                    <td>${assignment.subject}</td>
                    <td>${assignment.taskName}</td>
                    <td>${assignment.weighting}</td>
                    <td>${assignment.dueDate}</td>
                    <td><button onclick="removeAssignment(${index})">✖</button></td>`;
            });
        }
        // Handles The Input And Storage Of Data Put Into The Add Assignment Popup
        function addAssignment() {
            const subject = document.getElementById("subject-select").value;
            const taskName = document.getElementById("task-name-input").value;
            const weighting = document.getElementById("weighting-input").value;
            const dueDate = document.getElementById("due-date-input").value;
            if (subject && taskName && weighting && dueDate) {
                const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
                assignments.push({
                    subject: subject,
                    taskName: taskName,
                    weighting: weighting,
                    dueDate: dueDate
                });
                localStorage.setItem("assignments", JSON.stringify(assignments));
                loadAssignments();
                hidePopup("assignment-popup");
            }
        }
        // Removes The Assignment From Storage on Button Press
        window.removeAssignment = function(index) {
            const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
            assignments.splice(index, 1);
            localStorage.setItem("assignments", JSON.stringify(assignments));
            loadAssignments();
        }
        // Handles Button Presses And Page Loading
        addAssignmentBtn.onclick = () => showPopup("assignment-popup");
        saveAssignmentBtn.onclick = addAssignment;
        loadAssignments();
    }
    // Timetable Page Scripts
    if (window.location.pathname.endsWith("timetable.html")) {
        const timetableTable = document.getElementById("timetable");
        const saveTimetableBtn = document.getElementById("save-timetable-btn");
        // Creates The Timetable Table
        function loadTimetable() {
            const timetable = JSON.parse(localStorage.getItem("timetable")) || {};
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const periods = ["Before School", "1st Period", "2nd Period", "Recess", "3rd Period", "4th Period", "Lunch", "5th Period", "After School"];

            timetableTable.innerHTML = `<tr><th>Period</th>${days.map(day => `<th>${day}</th>`).join('')}</tr>`;
            // Allows for Each Timetable Slot To Be Editable
            periods.forEach(period => {
                const row = timetableTable.insertRow();
                row.innerHTML = `<th>${period}</th>${days.map(day => `<td onclick="editTimetable('${day}', '${period}')">${timetable[day]?.[period] || ''}</td>`).join('')}`;
            });
        }
        // Handles The Input And Storage Of Data Put Into The Edit Timetable Slot Popup
        function saveTimetable(day, period) {
            const subject = document.getElementById("subject-select").value;
            const roomNumber = document.getElementById("room-number-input").value;
            const timetable = JSON.parse(localStorage.getItem("timetable")) || {};
            timetable[day] = timetable[day] || {};
            timetable[day][period] = `${subject} in ${roomNumber}`;
            localStorage.setItem("timetable", JSON.stringify(timetable));
            loadTimetable();
            hidePopup("timetable-popup");
        }
        // Shows The Edit Timetable Popup When A Slot Is Clicked
        window.editTimetable = function(day, period) {
            showPopup("timetable-popup");
            saveTimetableBtn.onclick = () => saveTimetable(day, period);
        }

        loadTimetable();
    }
    // Pulls The Subjects From The Settings Page And Makes Them Available In The Subject Dropdown Menus
    function loadSubjectsDropdown() {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        const subjectSelects = document.querySelectorAll("#subject-select");
        subjectSelects.forEach(select => {
            select.innerHTML = subjects.map(subject => `<option value="${subject.name}">${subject.name}</option>`).join('');
        });
    }
    loadSubjectsDropdown();
    // Dashboard Page Scripts
    if (window.location.pathname.endsWith("index.html")) {
        const assignmentsColumn = document.getElementById("assignments-column");
        const averageMarksColumn = document.getElementById("average-marks-column");
        const goalsColumn = document.getElementById("goals-column");
        const addGoalBtn = document.getElementById("add-goal-btn");
        const saveGoalBtn = document.getElementById("save-goal-btn");
        // Loads The Dashboard
        function loadDashboard() {
            loadAssignmentsDashboard();
            loadAverageMarksDashboard();
            loadGoalsDashboard();
        }
        // Creates The Assignment Column And Table
        function loadAssignmentsDashboard() {
            const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
            const assignmentsList = document.getElementById("assignments-list");
            assignmentsList.innerHTML = assignments.map(assignment => `
                <tr>
                    <td>Subject</td>
                    <td>Task</td>
                    <td>Weighting</td>
                    <td>Due Date</td>
                </tr>
                <tr>
                    <td>${assignment.subject}</td>
                    <td>${assignment.taskName}</td>
                    <td>${assignment.weighting}</td>
                    <td>${assignment.dueDate}</td>
                </tr>`).join('');
        }
        // Creates The Average Mark Column And Table
        function loadAverageMarksDashboard() {
            const marks = JSON.parse(localStorage.getItem("marks")) || [];
            const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            const subjectMarks = {};
            // Calculates The Average Mark For Each Subject Based Upon Those Entered In The Marks Page
            marks.forEach(mark => {
                subjectMarks[mark.subject] = subjectMarks[mark.subject] || { total: 0, weightedSum: 0 };
                const percentage = mark.yourMarks / mark.totalMarks;
                subjectMarks[mark.subject].total += parseInt(mark.weighting);
                subjectMarks[mark.subject].weightedSum += percentage * parseInt(mark.weighting);
            });
            const averageMarksList = document.getElementById("average-marks-list");
            // Calculates The Overall Average Percentage Mark At The Top Of The Column
            let overallTotal = 0;
            let overallWeightedSum = 0;
            averageMarksList.innerHTML = subjects.map(subject => {
                const marks = subjectMarks[subject.name] || { total: 0, weightedSum: 0 };
                const average = (marks.total === 0) ? 0 : (marks.weightedSum / marks.total) * 100;
                overallTotal += marks.total;
                overallWeightedSum += marks.weightedSum;
                return `<tr><td>${subject.name}</td><td>${average.toFixed(2)}%</td></tr>`;
            }).join('');
            const overallAverage = (overallTotal === 0) ? 0 : (overallWeightedSum / overallTotal) * 100;
            document.getElementById("overall-average-mark").textContent = `Overall Average: ${overallAverage.toFixed(2)}%`;
        }
        // Creates The Goals Column And Table
        function loadGoalsDashboard() {
            const goals = JSON.parse(localStorage.getItem("goals")) || [];
            const goalsList = document.getElementById("goals-list");
            goalsList.innerHTML = goals.map((goal, index) => `
                <tr>
                    <td>${goal}</td>
                    <td><button onclick="removeGoal(${index})">✖</button></td>
                </tr>`).join('');
        }
        // Creates The Add Goal Popup
        function addGoal() {
            const goal = document.getElementById("goal-input").value;
            if (goal) {
                const goals = JSON.parse(localStorage.getItem("goals")) || [];
                goals.push(goal);
                localStorage.setItem("goals", JSON.stringify(goals));
                loadGoalsDashboard();
                hidePopup("goal-popup");
            }
        }
        // Removes The Add Goal Popup
        window.removeGoal = function(index) {
            const goals = JSON.parse(localStorage.getItem("goals")) || [];
            goals.splice(index, 1);
            localStorage.setItem("goals", JSON.stringify(goals));
            loadGoalsDashboard();
        }
        // Goal Column Loading And Button Handling
        addGoalBtn.onclick = () => showPopup("goal-popup");
        saveGoalBtn.onclick = addGoal;
        loadDashboard();
    }
});