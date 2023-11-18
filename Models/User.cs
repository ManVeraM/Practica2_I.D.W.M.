namespace Practica2_IDWM.Models;

public class User
{
    public long Id { get; set; }
    public string? Name { get; set; }

    public string? LastName { get; set; }

    public string? Email { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? Summary { get; set; }

     public List<Hobbie>? Hobbies { get; set; }
    public List<Framework>? Frameworks { get; set; }
}

    