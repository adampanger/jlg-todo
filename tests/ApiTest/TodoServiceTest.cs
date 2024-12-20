using JLGTodo.Api;
using JLGTodo.Api.Services;

using Shouldly;

namespace JLGTodo.ApiTest;

[TestClass]
public class TodoServiceTest
{
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
	private TodoService _sut;
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.

	[TestInitialize]
	public void Setup()
	{
		_sut = new();
	}

	[TestMethod]
	public void GetAll_ShouldReturnAllTodos()
	{
		var todos = _sut.GetAll();

		todos.ShouldNotBeNull();
		todos.Count().ShouldBe(1); // Assuming the initial list has 1 items
	}

	[TestMethod]
	public void GetById_ShouldReturnTodo_WhenIdExists()
	{
		var id = 1;

		var todo = _sut.GetById(id);

		todo.ShouldNotBeNull();
		todo.Id.ShouldBe(id);
	}

	[TestMethod]
	public void GetById_ShouldReturnNull_WhenIdDoesNotExist()
	{
		var id = 999;

		var todo = _sut.GetById(id);

		todo.ShouldBeNull();
	}

	[TestMethod]
	public void Create_ShouldAddNewTodo()
	{
		var newTodo = new TodoItem { Title = "New Task" };

		var createdTodo = _sut.Create(newTodo);
		var todos = _sut.GetAll();

		createdTodo.ShouldNotBeNull();
		createdTodo.Id.ShouldBe(todos.Count());  // The list should now have 2 items
		createdTodo.Title.ShouldBe(newTodo.Title);
	}

	[TestMethod]
	public void Update_ShouldModifyTodo_WhenIdExists()
	{
		var updatedTodo = new TodoItem { Id = 1, Title = "Updated Task", IsCompleted = true };

		var result = _sut.Update(updatedTodo);
		var todo = _sut.GetById(updatedTodo.Id);

		result.ShouldBeTrue();
		todo.ShouldNotBeNull();
		todo.Title.ShouldBe(updatedTodo.Title);
		todo.IsCompleted.ShouldBeTrue();
	}

	[TestMethod]
	public void Update_ShouldReturnFalse_WhenIdDoesNotExist()
	{
		var updatedTodo = new TodoItem { Id = 999, Title = "Updated Task", IsCompleted = true };

		var result = _sut.Update(updatedTodo);

		result.ShouldBeFalse();
	}

	[TestMethod]
	public void Delete_ShouldRemoveTodo_WhenIdExists()
	{
		var id = 1;

		var result = _sut.Delete(id);
		var todos = _sut.GetAll();
		var deletedTodo = _sut.GetById(id);

		result.ShouldBeTrue();
		todos.Count().ShouldBe(0); // The list had 2 items before
		deletedTodo.ShouldBeNull();
	}

	[TestMethod]
	public void Delete_ShouldReturnFalse_WhenIdDoesNotExist()
	{
		var id = 999;

		var result = _sut.Delete(id);

		result.ShouldBeFalse();
	}
}
