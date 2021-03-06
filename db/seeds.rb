# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
9.times do |i|
    Project.create(
        name: "Test Project #{i + 1}",
        description: "Test Description",
        repo_url: "https://www.google.com/",
        status: i%2 == 0 ? 0 : 1
    )
end

5.times do |i|
    Skill.create(
        name: "Test skill #{i + 1}"
    )
end