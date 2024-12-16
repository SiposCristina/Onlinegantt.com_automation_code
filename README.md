# Onlinegantt.com_automation_code

<h3>Product Information</h3> <p> The Online Gantt Chart (https://www.onlinegantt.com) is a web-based project management tool that helps visualize tasks and timelines in a clear, interactive format. It uses a horizontal bar chart to display project schedules, showing task durations, dependencies, and milestones. It also has features like resource allocation, progress tracking, multiple color schemes, project view, resource view, resource and settings editing.<br>
The Online Gantt Chart has a cloud version and a local version. I tested only the local version, that does not require creating an account.
 </a> </p>

<h3>Description</h3> <p>To test the performance of the application, I wrote a Playwright script. The script reads a JSON file that contains 58 tasks, another with 258 tasks, and a third with 508 tasks. Each file is read by the script and then it adds each task to the project. At the end of that process, the script performs a set of characteristic operations on six tasks, including indenting them, setting dependencies, assigning resources, and exporting project data.<br>
<br>
The purpose is to collect data and analyze it to observe how the application responds as the number of tasks increases.</p>

<h3>Test Results</h3> <p>As the below charts illustrate, as more tasks are added, the application performance gradually slows down.  </p>
[![Chart1](https://github.com/user-attachments/assets/b2addc6b-2ff7-44c0-a850-075d2f4ebdc9)](https://private-user-images.githubusercontent.com/157922599/396241207-dbe5c7fd-642e-48b2-87bd-4231b35d0b7a.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQzNzc0MTAsIm5iZiI6MTczNDM3NzExMCwicGF0aCI6Ii8xNTc5MjI1OTkvMzk2MjQxMjA3LWRiZTVjN2ZkLTY0MmUtNDhiMi04N2JkLTQyMzFiMzVkMGI3YS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIxNlQxOTI1MTBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xNWY3NzY5YjhmZTMxYzBkZDgxMzhlMWQ2Nzg3Mzk1ZTcwZDZmNjViNTA4YTBkODI4MTU0MzA1OGQ1YjI4YjJiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.NpN5OiA8EpQVSRKq3vvjDeZ_76k5Nd4zHwhiwHdNruo)
<br>
<p>Also, the script provides information about how much time is required to indent six tasks, assign resources to six tasks, and add dependencies and notes to four tasks. This data is collected after all tasks (58, 258, and 508) have been added. <br>
<br>
As illustrated in the chart below, the time required increases as more tasks are added, even when the number of indented tasks, assigned resources, added dependencies and notes remains constant.  This indicates that the product becomes difficult to use as the size of the project reaches a couple hundred tasks.
</p>
![image](https://github.com/user-attachments/assets/6d784004-1e4c-4b08-887b-7a3169c66c8e)




