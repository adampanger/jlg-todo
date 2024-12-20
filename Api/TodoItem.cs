namespace JLGTodo.Api;

public record TodoItem
{
    public int Id { get; set; }

    public required string Title { get; set; }

    public bool IsCompleted { get; set; }
}