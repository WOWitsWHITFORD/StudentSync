document.addEventListener("DOMContentLoaded", function() {
    // Navbar Date and Time
    function updateTime() {
        const now = new Date();
        const datetime = document.getElementById("datetime");
        datetime.textContent = now.toLocaleString();
    }
    setInterval(updateTime, 1000);

    // Popup handling
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

    // Settings Page
    if (window.location.pathname.endsWith("settings.html")) {
        const subjectsTable = document.getElementById("subjects-table");
        const addSubjectBtn = document.getElementById("add-subject-btn");
        const saveSubjectBtn = document.getElementById("save-subject-btn");

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

        window.removeSubject = function(index) {
            const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            subjects.splice(index, 1);
            localStorage.setItem("subjects", JSON.stringify(subjects));
            loadSubjects();
        }

        addSubjectBtn.onclick = () => showPopup("subject-popup");
        saveSubjectBtn.onclick = addSubject;
        loadSubjects();
    }

    // Marks Page
    if (window.location.pathname.endsWith("marks.html")) {
        const marksTable = document.getElementById("marks-table");
        const addMarkBtn = document.getElementById("add-mark-btn");
        const saveMarkBtn = document.getElementById("save-mark-btn");

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

        window.removeMark = function(index) {
            const marks = JSON.parse(localStorage.getItem("marks")) || [];
            marks.splice(index, 1);
            localStorage.setItem("marks", JSON.stringify(marks));
            loadMarks();
        }

        addMarkBtn.onclick = () => showPopup("mark-popup");
        saveMarkBtn.onclick = addMark;
        loadMarks();
    }

    // Assignments Page
    if (window.location.pathname.endsWith("assignments.html")) {
        const assignmentsTable = document.getElementById("assignments-table");
        const addAssignmentBtn = document.getElementById("add-assignment-btn");
        const saveAssignmentBtn = document.getElementById("save-assignment-btn");

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

        window.removeAssignment = function(index) {
            const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
            assignments.splice(index, 1);
            localStorage.setItem("assignments", JSON.stringify(assignments));
            loadAssignments();
        }

        addAssignmentBtn.onclick = () => showPopup("assignment-popup");
        saveAssignmentBtn.onclick = addAssignment;
        loadAssignments();
    }

    // Timetable Page
    if (window.location.pathname.endsWith("timetable.html")) {
        const timetableTable = document.getElementById("timetable");
        const saveTimetableBtn = document.getElementById("save-timetable-btn");

        function loadTimetable() {
            const timetable = JSON.parse(localStorage.getItem("timetable")) || {};
            const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
            const periods = ["Before School", "1st Period", "2nd Period", "Recess", "3rd Period", "4th Period", "Lunch", "5th Period", "After School"];

            timetableTable.innerHTML = `<tr><th>Period</th>${days.map(day => `<th>${day}</th>`).join('')}</tr>`;

            periods.forEach(period => {
                const row = timetableTable.insertRow();
                row.innerHTML = `<th>${period}</th>${days.map(day => `<td onclick="editTimetable('${day}', '${period}')">${timetable[day]?.[period] || ''}</td>`).join('')}`;
            });
        }

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

        window.editTimetable = function(day, period) {
            showPopup("timetable-popup");
            saveTimetableBtn.onclick = () => saveTimetable(day, period);
        }

        loadTimetable();
    }

    // Load subjects for dropdowns
    function loadSubjectsDropdown() {
        const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
        const subjectSelects = document.querySelectorAll("#subject-select");
        subjectSelects.forEach(select => {
            select.innerHTML = subjects.map(subject => `<option value="${subject.name}">${subject.name}</option>`).join('');
        });
    }
    loadSubjectsDropdown();

    // Dashboard
    if (window.location.pathname.endsWith("index.html")) {
        const assignmentsColumn = document.getElementById("assignments-column");
        const averageMarksColumn = document.getElementById("average-marks-column");
        const goalsColumn = document.getElementById("goals-column");
        const addGoalBtn = document.getElementById("add-goal-btn");
        const saveGoalBtn = document.getElementById("save-goal-btn");

        function loadDashboard() {
            loadAssignmentsDashboard();
            loadAverageMarksDashboard();
            loadGoalsDashboard();
        }

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

        function loadAverageMarksDashboard() {
            const marks = JSON.parse(localStorage.getItem("marks")) || [];
            const subjects = JSON.parse(localStorage.getItem("subjects")) || [];
            const subjectMarks = {};
            marks.forEach(mark => {
                subjectMarks[mark.subject] = subjectMarks[mark.subject] || { total: 0, weightedSum: 0 };
                const percentage = mark.yourMarks / mark.totalMarks;
                subjectMarks[mark.subject].total += parseInt(mark.weighting);
                subjectMarks[mark.subject].weightedSum += percentage * parseInt(mark.weighting);
            });
            const averageMarksList = document.getElementById("average-marks-list");
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

        function loadGoalsDashboard() {
            const goals = JSON.parse(localStorage.getItem("goals")) || [];
            const goalsList = document.getElementById("goals-list");
            goalsList.innerHTML = goals.map((goal, index) => `
                <tr>
                    <td>${goal}</td>
                    <td><button onclick="removeGoal(${index})">✖</button></td>
                </tr>`).join('');
        }

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

        window.removeGoal = function(index) {
            const goals = JSON.parse(localStorage.getItem("goals")) || [];
            goals.splice(index, 1);
            localStorage.setItem("goals", JSON.stringify(goals));
            loadGoalsDashboard();
        }

        addGoalBtn.onclick = () => showPopup("goal-popup");
        saveGoalBtn.onclick = addGoal;
        loadDashboard();
    }
});