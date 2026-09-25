# Builds the React client (via the .esproj JavaScript SDK) and the ASP.NET Core
# server into one image; the server serves the built site from wwwroot.
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
RUN apt-get update && apt-get install -y --no-install-recommends curl ca-certificates \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY . .
RUN dotnet publish KaishikiVhedicGurukulVidalaya.Server/KaishikiVhedicGurukulVidalaya.Server.csproj \
    -c Release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
# Hosts such as Render/Railway inject PORT; default to 8080 elsewhere.
ENV ASPNETCORE_ENVIRONMENT=Production
CMD ["sh", "-c", "ASPNETCORE_URLS=http://0.0.0.0:${PORT:-8080} exec dotnet KaishikiVhedicGurukulVidalaya.Server.dll"]
