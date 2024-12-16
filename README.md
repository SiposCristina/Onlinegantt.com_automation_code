# Onlinegantt.com_automation_code

<h3>Product Information</h3> <p> The Online Gantt Chart (https://www.onlinegantt.com) is a web-based project management tool that helps visualize tasks and timelines in a clear, interactive format. It uses a horizontal bar chart to display project schedules, showing task durations, dependencies, and milestones. It also has features like resource allocation, progress tracking, multiple color schemes, project view, resource view, resource and settings editing.<br>
The Online Gantt Chart has a cloud version and a local version. I tested only the local version, that does not require creating an account.
 </a> </p>

<h3>Description</h3> <p>To test the performance of the application, I wrote a Playwright script. The script reads a JSON file that contains 58 tasks, another with 258 tasks, and a third with 508 tasks. Each file is read by the script and then it adds each task to the project. At the end of that process, the script performs a set of characteristic operations on six tasks, including indenting them, setting dependencies, assigning resources, and exporting project data.<br>
<br>
The purpose is to collect data and analyze it to observe how the application responds as the number of tasks increases.</p>

<h3>Test Results</h3> <p>As the below charts illustrate, as more tasks are added, the application performance gradually slows down.  </p>

![Image Alt](https://github.com/SiposCristina/Onlinegantt.com_automation_code/blob/914f5ad75e47110d4ae3696cf6924a2b600f1a70/Chart1.jpg)


<br>
<p>Also, the script provides information about how much time is required to indent six tasks, assign resources to six tasks, and add dependencies and notes to four tasks. This data is collected after all tasks (58, 258, and 508) have been added. <br>
<br>
As illustrated in the chart below, the time required increases as more tasks are added, even when the number of indented tasks, assigned resources, added dependencies and notes remains constant.  This indicates that the product becomes difficult to use as the size of the project reaches a couple hundred tasks.
</p>
![image](https://github.com/user-attachments/assets/6d784004-1e4c-4b08-887b-7a3169c66c8e)




