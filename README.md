# Onlinegantt.com_automation_code

<h3>Product Information</h3> <p> The Online Gantt Chart (https://www.onlinegantt.com) is a web-based project management tool that helps visualize tasks and timelines in a clear, interactive format. It uses a horizontal bar chart to display project schedules, showing task durations, dependencies, and milestones. It also has features like resource allocation, progress tracking, multiple color schemes, project view, resource view, resource and settings editing.<br>
The Online Gantt Chart has a cloud version and a local version. I tested only the local version, that does not require creating an account.
 </a> </p>

<h3>Description</h3> <p>To test the performance of the application, I wrote a Playwright script. The script reads a JSON file that contains 58 tasks, another with 258 tasks, and a third with 508 tasks. Each file is read by the script and then it adds each task to the project. At the end of that process, the script performs a set of characteristic operations on six tasks, including indenting them, setting dependencies, assigning resources, and exporting project data.<br>
<br>
The purpose is to collect data and analyze it to observe how the application responds as the number of tasks increases.</p>

<h3>Test Results</h3> <p>As the below charts illustrate, as more tasks are added, the application performance gradually slows down.  </p>
