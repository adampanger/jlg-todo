namespace JLGTodo.Api.Services;

public class TodoService : ITodoService
{
    private readonly List<TodoItem> _items = [];

    public TodoItem Create(TodoItem newItem)
    {
        _items.Add(newItem);
        return newItem;
    }

    public bool Delete(int id)
    {
        var itemToDelete = GetById(id);
        if (itemToDelete is null) 
        {
            return false;
        }

        return _items.Remove(itemToDelete);
    }

    public IEnumerable<TodoItem> GetAll()
    {
        return _items;
    }

    public TodoItem? GetById(int id)
    {
        return _items.FirstOrDefault(x => x.Id == id);
    }

    public bool Update(TodoItem updatedItem)
    {
        var existing = GetById(updatedItem.Id);
        if (existing is null)
        {
            return false;
        }

        existing.Title = updatedItem.Title;
        existing.IsCompleted = updatedItem.IsCompleted;
        return true;
    }
}