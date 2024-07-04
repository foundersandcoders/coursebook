---
title: Dependency injections and interfaces in Dotnet
description: Learn how to use dependency injections and interfaces in Dotnet
tags:
  - workshop
keywords:
  - DOTNET
  - ASP.NET 
  - CSharp
challenge: https://github.com/foundersandcoders/DOTNET-Workshop-Two/blob/main/README.md
---



## Setting up .Net

Dot net projects can be made in VSCode just like javascript. In order to get started with this you will need to first install the dot net SDK https://dotnet.microsoft.com/en-us/download and the C# Dev kit https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.csdevkit




## Why Dependency Injections

It is quite common to have an object that depends on another object to do its function especially in a object focused environment like dotnet. For instance your constructor depends on your data context object. However it can cause problems to always have to build dependencies first and then the objects that depend on them next. Also what if two classes need to access different versions of the dependency for example we might want to use the data context class both in a testing class and in the actual project but when using it in the testing context might want to set it up in such a way that we don't actually effect the database we could do this by adjusting the controller class but it would be easier if we could make that class initially more flexible. 

The solution to these problems is dependency injections where rather than creating a dependency that a class depends on we give the class a interface to tell it what type of object to expect and then create a service that allows us to create dependencies as needed and inject them into the class. 

## Set up

Open the simple hello world project you made last week. Within MyWebApi (or whatevery you named the project) add a models directory and create a Book.cs file within it that looks like this .

```cs
namespace MyWebApi.Models
{

    public class Book
    {
        public Guid Id {set; get;}
        public string? Name {set; get;}
        

    }
}

```
We now need to install Microsoft EntityFrameworkCore to help set up a quick in memory database. Like so


```dotnet

dotnet add package Microsoft.EntityFrameworkCore

```
then we make a data folder and inside make a BookContext.cs file that will look like so

```cs
using Microsoft.EntityFrameworkCore;
using MyWebApi.Models;
namespace  MyWebApi.Data
{
    public class BookContext : DbContext
    {
        public BookContext(DbContextOptions options): base(options){}
        
        public  DbSet<Book> Books {set; get;}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
modelBuilder.Entity<Book>().HasData(
new Book {Id = Guid.NewGuid(), Name = "The Prospects"},
new Book {Id = Guid.NewGuid(), Name = "Nevada"}



);

            base.OnModelCreating(modelBuilder);
        }

    }

}

```
this is moving towards a simple in memory database containing two books with randomly generated ids. First we will need to update our Program.cs file to use them.

start by installing the following package

```dotnet
dotnet add package Microsoft.EntityFrameworkCore.InMemory
```

Then update the Program.cs file to look like what follows.

```cs
 using Microsoft.EntityFrameworkCore;
using MyWebApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BookContext>(options => options.UseInMemoryDatabase("book db"));
builder.Services.AddControllers();

var app = builder.Build();
using(var scope = app.Services.CreateScope())
using(var db = scope.ServiceProvider.GetService<BookContext>()!)
{
    db.Database.EnsureCreated();
}
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllerRoute("default", "api/[controller]/[action]");


app.UseHttpsRedirection();




app.Run();


```
This should give our BookContext the power to create in memory databases and ensure they are created on app build.

Now lets update our controller to be a book controller that returns a list of books. 

```cs
using Microsoft.AspNetCore.Mvc;
using MyWebApi.Data;
using MyWebApi.Models;


namespace MyWebApi.Controllers
{
      [ApiController]
    [Route("api/[controller]/[action]")]
public class BookController : Controller
{
    private readonly BookContext _context;
    public  BookController(BookContext context)
    {
        _context = context;
    }
    [HttpGet]
    public List<Book> GetAllBooks()
    {
        var result = _context.Books.ToList();
        return result;
    }

    [HttpGet]
    public Book GetABook(string name)
    {
var result = _context.Books.FirstOrDefault<Book>((book)=> book.Name== name);

            if (result == null)
                throw new Exception("book not found");
return result;
    }
}
}

```
give it a quick swagger test then lets look at a part of this code in more detail.


```cs
public class BookController : Controller
{
    private readonly BookContext _context;
    public  BookController(BookContext context)
    {
        _context = context;
    }
```
The constructor for this class (line 4) requires BookContext to function. This means these two objects are now tightly linked and we cant easily  change one without changing the other.

To allow us more flexibility we are going to create something called an interface that we can feed in instead. An interface lets the constructor know what to expect but will not be as absolute as actually giving it the class.

the first step to do that is to go into our data directory and make a new file called IBookContext that looks like this.

```cs
using MyWebApi.Models;
using Microsoft.EntityFrameworkCore;

namespace MyWebApi.Data
{
     public interface IBookContext
    {
public DbSet<Book> Books {set; get;}    
}
}
```

This creates an interface and tells the class passed this that at run time it can expect something that contains a DbSet of books rather than the specific class passed to it before. Now we just need to tell all the other parts of our program to look for the interface rather than the object.

lets start with the BookContext file itself

```cs
using Microsoft.EntityFrameworkCore;
using MyWebApi.Models;
namespace  MyWebApi.Data
{
    public class BookContext : DbContext ,IBookContext
  
```
if we make this change the BookContext can now inherits from both DbContext and IBookContext.

Now we want to update our Program.cs file so that when the context is built int knows it could take anything that matches the interface requirements
```cs
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<IBookContext,BookContext>(options => options.UseInMemoryDatabase("book db"));
builder.Services.AddControllers();
```
Finally we do what we wanted to all along which is make our book controller independent from the BookContext class by putting our interface in the constructor. 
```cs

public class BookController : Controller
{
    private readonly IBookContext _context;
    public  BookController(IBookContext context)
```

Besides making your work easier by having these two things loser it will also give you the ability to for instance in tests fill an IBookContext with fake data and easily use it for testing as shown bellow.

```cs

 {
    public class BookControllerTests
    {

        private readonly BookController _controller;
        public  BookControllerTests()
        {

var fakeData = new List<Book>
{
    new Book {Id = Guid.NewGuid(), Name = "Fake book1" },
        new Book {Id = Guid.NewGuid(), Name = "Fake book2" }


}.AsQueryable();         
var _context = new Mock<IBookContext>();   
_context.Setup(db => db.Books).ReturnsDbSet(fakeData);

_controller = new BookController(_context.Object);
        }

[Fact]        
public void GetAllBooks_Returns_Entire_List()
{

    var expected = new List<Book>
{
    new Book {Id = Guid.NewGuid(), Name = "Fake book1" },
        new Book {Id = Guid.NewGuid(), Name = "Fake book2" }


}.AsQueryable();

var result = _controller.GetAllBooks().ToList();

Assert.Equivalent(expected, result);
}

[Fact]
public void GetABook_Returns_A_Book()
{
    var expected =     new Book {Id = Guid.NewGuid(), Name = "Fake book1" };




var result = _controller.GetABook("Fake book1");

Assert.Equivalent(expected, result);

    }
}
}
```
Note this part which would not be possible if the Book controller relied on a BookContext
```cs
var _context = new Mock<IBookContext>();   
_context.Setup(db => db.Books).ReturnsDbSet(fakeData);

_controller = new BookController(_context.Object);
```