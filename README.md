# Pharos Coding Exercise

This exercise is to help us better understand your experience in react and typescript

## Setup

To get started, install the dependencies with `npm install`.

Run the application with `npm start`.

Launch application in browser at [http://localhost:3000](http://localhost:3000).

## Task

We would like you build a simple data explorer as shown in the image below.
Basically there are two components, the navigationh tree and the application list based on the tree item selected

![Pharos Coding Exercise wireframe](/pharos-coding-exercise.png)

The data is a list of application records and is fetchable at `/data.json`. Each application has 3 levels of business capabilities. Business capabilities are hierarchical as shown in the image (Business capability 1 -> Business capability 2 -> Business capability 3)
Important: Use the data file provided

The app should -

- Requests the dataset.
- Build a hierarchical navigation tree displaying the different levels of business capabilities.
- Present a list of applications from the data set, showing name and total spend. The list depends on the navigation tree

Additional notes

- Estimated time 1.5 hours based on the average time from previous candidates
- We will be looking at code/file structure, code quality & best practices.
- Add comments where necessary or to document any assumptions/considerations you may have.
- You shouldn't need to use any external libraries
- You dont need to write any unit test
