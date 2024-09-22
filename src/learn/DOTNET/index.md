---
title: Introduction to .NET
description: Learn how to set up a basic .NET app
tags:
  - workshop
keywords:
  - .NET
  - ASP.NET
  - CSharp
challenge: https://github.com/foundersandcoders/DOTNET-Workshop
---


Although all our coding so far has been in JavaScript or its close cousin typescript, not all websites are coded in this language. If you know other popular coding languages it will boost your capabilities as a dev.
The benefits of languages over one another have much to do with situation and preference. Proponents of .NET will tell you that in comparison to javascript, the language was designed with much more intention, and while javascript devs are constantly installing new libraries to do anything .NET has in its built-in library most of the functionality needed to be a developer. They will also tell you that when you get to the point of maximizing the speed of your code .NET will make things easier. Many people are also fans of object-oriented programming but coming from functional programming it's unlikely you will initially feel that way.


## Setting up .Net


Dot net projects can be made in VSCode just like JavaScript. In order to get started with this you will need to first install the dot net SDK https://dotnet.microsoft.com/en-us/download and the C# Dev kit https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit








## Setting up project


Start by creating a new project and cd-ing into it.


You can use the following command to view a list of templates available for your project:


```shell
dotnet new list
```


But what we want to build is a WebApi app. The command to create that template is this:


```dotnet


dotnet new webapi -n MyWebApi


```






## Personalizing your project


Open the new directory and navigate to the program file. This file is the entry point for execution and where servers and middleware can be configured. When you create a new project Microsoft helpfully includes some code to tell you the weather in this project. We can delete this. After removing the weather stuff the file should look like


```cs


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();






app.Run();




```
Before we leave the program file to make an API controller we want to add 3 more lines to the program file.
1. builder.Services.AddControllers();
 so the file knows we are making a controller
2. app.UseAuthorization();
which is middleware that is required to run on a route before it accesses the endpoint
3. app.MapControllers();
which attaches endpoints to our controllers.


the final file should look like this
```cs
var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();


app.UseAuthorization();


app.MapControllers();




app.Run();




```




## Creating a controller




Inside your MyWebApi directory make a new directory called controllers. Inside this directory make a new file called MyController.cs


within the file add this code
```cs
// imports useful methods for setting up a controller
using Microsoft.AspNetCore.Mvc;
// sets up an api controller
namespace MyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HelloController : ControllerBase
    {
// creates our get route
        [HttpGet]
        public string Get()
        {
          //decides what is returned by the route
            return "Hello, World!";
        }
    }
}




```
you now have a very simple API built in .NET
## Using Swagger to test controllers


Make sure your terminal is inside the API directory then use


```shell
dotnet run
```
You should get a link to visit but there is nothing there. The trick is to add `/swagger` onto the end of your URL. If everything has worked properly you should be taken to a web page where you can click around and test any routes from your controller give it a go. It should look something like this.


![image](https://github.com/foundersandcoders/coursebook/assets/113926900/51a3063c-2549-4421-b6af-10e1587329e7)






As a final note before you commit any of this work to GitHub .NET projects generate small dev files at a scary rate so you should make sure you set up a .gitignore a shortcut for making one that ignores all the files you will only need locally is


```shell
dotnet new gitignore  
```



