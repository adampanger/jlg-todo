namespace JLGTodo.Api.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();

    TodoItem? GetById(int id);

    TodoItem Create(TodoItem newItem);

    bool Update(TodoItem updatedItem);

    bool Delete(int id);
}