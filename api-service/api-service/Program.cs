var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

// Configure Kestrel to use a port defined in the environment variables (for Heroku)
string port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseKestrel().UseUrls("http://*:" + port);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
    policy.WithOrigins("http://localhost:3000", "https://localhost:3000", "http://localhost:3000/GamePage", "https://localhost:3000/GamePage",
    "http://higher-or-lower-clone.s3-website.eu-north-1.amazonaws.com", "https://higher-or-lower-clone.s3-website.eu-north-1.amazonaws.com",
    "http://higher-or-lower-clone.s3-website.eu-north-1.amazonaws.com/GamePage", "https://higher-or-lower-clone.s3-website.eu-north-1.amazonaws.com/GamePage"
    )
    .AllowAnyMethod()
    .AllowAnyHeader());

app.UseAuthorization();

app.MapControllers();

app.Run();
