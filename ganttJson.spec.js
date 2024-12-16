import { test, expect } from '@playwright/test';
const testdata = JSON.parse(JSON.stringify(require("../testdata8.json")))
const { chromium } = require('playwright');
const fs = require('fs');


test('test', async ({ page }) => {
  
  await page.goto('https://www.onlinegantt.com/#/gantt'); 
  await page.getByRole('button', { name: 'New' }).click();
  await page.getByRole('button', { name: 'OK' }).click();

  //await page.waitForTimeout(1000);
  

  for (const task of testdata.tasks) {
    let startTime = Date.now();
    await page.getByLabel('Add', { exact: true }).click();
    const taskName = task.name; 
    const startDate = task.startDate;
    const endDate = task.endDate;
    const progress = task.progress;

    // Set task name
	await page.getByLabel('Task Name', { exact: true }).fill(task.name);

    // Set start date
    await page.getByLabel('Start', { exact: true }).fill("");
    await page.getByLabel('Start', { exact: true }).fill(startDate);
    
    // Set end date
    await page.getByLabel('End', { exact: true }).fill("");
    await page.getByLabel('End', { exact: true }).fill(endDate);

    // Set progress
    await page.getByLabel('Progress %', { exact: true }).fill('')
    const progressField = await page.getByLabel('Progress %', { exact: true });
    //await progressField.click();
    await progressField.fill(progress);

    // Save the task
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    let endTime = Date.now();
    let timeDiff = endTime - startTime;
    console.log(`Time taken to add task for ${taskName}: ${timeDiff} ms`);

    // Short delay between adding tasks
    await page.waitForTimeout(500);
  }
  
 
// indent subtasks
  let totalStartTime = Date.now();
   for (const taskName of testdata.tasksToIndent) {
    await page.waitForTimeout(400);
    await page.getByText(taskName, {exact:true}).click();
    await page.locator("#GanttContainer_indent").click();
    }

// set the dependencies
    for (const dandn of testdata.createDependencies) {
    const taskName = dandn.taskName;
    const dependency = dandn.dependency;
    const type = dandn.type;
    const notes = dandn.notes;

	// click on task information
    await page.locator("span").filter({hasText: dandn.taskName, exact: true}).click({button: 'right'});
    await page.getByRole('menuitem', { name: ' Task Information' }).click();

	// set task to depend upon
    await page.getByLabel('tab-header').getByText("Dependency").click(); 
    await page.getByLabel('Dependency', { exact: true }).getByLabel('Add').click();
    await page.locator("#GanttContainerDependencyTabContainername").fill(dandn.dependency);
    await page.locator('#GanttContainerDependencyTabContainername').press('Enter');
    await page.waitForTimeout(500);

	// set dependency type and notes
    await page.getByRole('combobox', { name: "Finish-Start" }).locator('span').click();
    await page.getByRole("option", {name: dandn.type}).dispatchEvent("click");
    await page.getByText('Notes').click();
    await page.locator('#GanttContainerNotesTabContainer_rte-edit-view').fill(dandn.notes);
    await page.getByRole('button', { name: 'OK' }).click();
    }

  // create resources 
  await page.locator('#view').selectOption('Edit Resources');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 1');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 2');
  await page.locator("[value='']").first().click();
  await page.locator("[value='']").first().fill('Team 3');
  await page.locator('#view').selectOption('Project View');

 
  for (const item of testdata.setResources) {
    const task = item.task;
    const resource = item.resource;

	//set resource
    await page.getByText(item.task, { exact: true }).click({button: 'right'});
    await page.getByRole('menuitem', { name: ' Task Information' }).click();
    await page.getByLabel('tab-header').getByText('Resources').click();
    await page.getByRole('row', { name: item.resource }).locator('span').first().click();
    await page.getByRole('button', { name: 'OK', exact: true }).click();
    }
   
  
  // export data
  for (const file of testdata.files){
    const fileName = file.fileName;
    const fileType = file.fileType;

    await page.getByRole('button', { name: 'Import / Export' }).dispatchEvent("click");
    await page.waitForTimeout(500);

    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept().catch(() => {});
      });

    const downloadPromise = page.waitForEvent('download');

    await page.getByRole('menuitem', { name: file.fileName }).dispatchEvent("click");
	  await page.waitForTimeout(500);
    if (file.fileName == 'Export to Excel File')
	{
		await page.getByRole('button', { name: 'OK' }).click();
		await page.waitForTimeout(1000);

	}
	else
	{
      await page.getByRole('button', { name: 'Export', exact: true }).dispatchEvent("click");
      await page.waitForTimeout(1000); 
    }
    
    const download = await downloadPromise;
   
    const date= new Date();
    let month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    let day = date.getDate();

    //save the downloaded files
    await download.saveAs(`./downloads-${day}${month}/${file.fileType}`);
    }
    let totalEndTime = Date.now();
    console.log(`Total time taken to add dependency, resources and notes: ${totalEndTime - totalStartTime} ms`);

  
});