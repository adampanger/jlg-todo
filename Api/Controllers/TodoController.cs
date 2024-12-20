using JLGTodo.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace JLGTodo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodoController(ITodoService todoService) : ControllerBase
{
    private readonly ITodoService _todoService = todoService;

    [HttpGet]
    public IActionResult GetAll()
    {
        var items = _todoService.GetAll();
        return Ok(items);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
        var item = _todoService.GetById(id);
        if (item is null) 
        {
            return NotFound();
        }

        return Ok(item);
    }

    [HttpPost]
    public IActionResult Create([FromBody] TodoItem newItem)
    {
        var createdItem = _todoService.Create(newItem);
        return CreatedAtAction(nameof(GetById), new { id = createdItem.Id }, createdItem);
    }

    [HttpPut]
    public IActionResult Update([FromBody] TodoItem updatedItem)
    {
        var success = _todoService.Update(updatedItem);
        if (!success) 
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var success = _todoService.Delete(id);
        if (!success)
        {
            return NotFound();
        }
        
        return NoContent();
    }
}