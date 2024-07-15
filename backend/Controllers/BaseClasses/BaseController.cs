using System.Net;
using backend.Entities.Interfaces;
using backend.Logic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers.BaseClasses;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<TEntity, TEntityModel>(
    IBaseLogic<TEntity, TEntityModel> logic) : Controller
    where TEntity : class, IIdentifier
{
    [HttpGet]
    public virtual async Task<IActionResult> GetByIdAsync([FromQuery] int id)
    {
        try
        {
            return Ok(await logic.GetByIdAsync(id));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    [HttpPost]
    public virtual async Task<IActionResult> AddAsync([FromBody] TEntity entity)
    {
        try
        {
            return StatusCode((int) HttpStatusCode.Created, await logic.AddAsync(entity));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    [HttpPut]
    public virtual async Task<IActionResult> UpdateAsync([FromBody] TEntity entity)
    {
        try
        {
            return Ok(await logic.UpdateAsync(entity));
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    
    [HttpDelete]
    public virtual async Task<IActionResult> DeleteAsync([FromQuery] int id)
    {
        try
        {
            await logic.DeleteAsync(id);
            return StatusCode((int)HttpStatusCode.NoContent);
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
    
    [HttpGet("List")]
    public virtual async Task<IActionResult> ListAsync()
    {
        try
        {
            return Ok(await logic.ListAsync());
        }
        catch (Exception ex)
        {
            return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
        }
    }
}