# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

# Reset the database if we're ever going to re-seed. If we want to add individual signs, should do it via the command line (or Rails migrations?) or a simple admin panel we can build
Product.destroy_all

sign_19 = Product.create(name: "Reforestation Project", size: "11x15", material: ".05g HDPE", description: "", style_number: "19")

file_19 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style19.gif')

sign_19.image.attach(io: file_19, filename: 'style19.gif')


sign_21 = Product.create(name: "Forest Retention Area", size: "11x15", material: ".05g HDPE", description: "", style_number: "21")

file_21 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style21.gif')

sign_21.image.attach(io: file_21, filename: 'style21.gif')


sign_22 = Product.create(name: "Specimen Tree", size: "11x15", material: ".05g HDPE", description: "", style_number: "22")

file_22 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style22.gif')

sign_22.image.attach(io: file_22, filename: 'style22.gif')


sign_23 = Product.create(name: "Wetland Protection Area", size: "11x15", material: ".05g HDPE", description: "", style_number: "23")

file_23 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style23.gif')

sign_23.image.attach(io: file_23, filename: 'style23.gif')


sign_24 = Product.create(name: "Streamside Forest Buffer — Chesapeake Bay", size: "11x15", material: ".05g HDPE", description: "", style_number: "24")

file_24 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style24.gif')

sign_24.image.attach(io: file_24, filename: 'style24.gif')


sign_25 = Product.create(name: "Streamside Forest Buffer — Generic", size: "11x15", material: ".05g HDPE", description: "", style_number: "25")

file_25 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style25.gif')

sign_25.image.attach(io: file_25, filename: 'style25.gif')


sign_26 = Product.create(name: "Chesapeake Bay Critical Area Buffer", size: "11x15", material: ".05g HDPE", description: "", style_number: "26")

file_26 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style26.png')

sign_26.image.attach(io: file_26, filename: 'style26.png')


sign_31 = Product.create(name: "Tree Preservation Area", size: "12x18", material: ".05g HDPE", description: "", style_number: "31")

file_31 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style31.gif')

sign_31.image.attach(io: file_31, filename: 'style31.gif')


sign_35 = Product.create(name: "Meadow Restoration", size: "11x15", material: ".05g HDPE", description: "", style_number: "35")

file_35 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style35.gif')

sign_35.image.attach(io: file_35, filename: 'style35.gif')


sign_47 = Product.create(name: "Forest Buffer - Baltimore County", size: "6x8", material: ".032g aluminum", description: "", style_number: "47")

file_47 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style47.gif')

sign_47.image.attach(io: file_47, filename: 'style47.gif')


sign_48 = Product.create(name: "Forest Conservation Area - Baltimore County", size: "6x8", material: ".032g aluminum", description: "", style_number: "48")

file_48 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style48.gif')

sign_48.image.attach(io: file_48, filename: 'style48.gif')


sign_49 = Product.create(name: "Chesapeake Bay Critical Area", size: "6x8", material: ".032g aluminum", description: "", style_number: "49")

file_49 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style49.gif')

sign_49.image.attach(io: file_49, filename: 'style49.gif')


sign_50 = Product.create(name: "Water Resource Protection Area", size: "6x8", material: ".032g aluminum", description: "", style_number: "50")

file_50 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style50.gif')

sign_50.image.attach(io: file_50, filename: 'style50.gif')


sign_51 = Product.create(name: "Forest Conservation Area - Carroll County", size: "6x8", material: ".032g aluminum", description: "", style_number: "51")

file_51 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style51.gif')

sign_51.image.attach(io: file_51, filename: 'style51.gif')


sign_61 = Product.create(name: "Forest Conservation Area - Montgomery County", size: "5.5x8", material: ".032g aluminum", description: "", style_number: "61")

file_61 = URI.open('https://tree-company-seeds.s3.amazonaws.com/style61.jpg')

sign_61.image.attach(io: file_61, filename: 'style61.jpg')


# Create the counties and all relevant associations
County.destroy_all

(Constants::MARYLAND_COUNTIES + Constants::VIRGINIA_COUNTIES).each do |c|
    County.find_or_create_by!(name: c)
end

ProductCounty.destroy_all

baltimore = County.find_by(name: "Baltimore County")
carroll = County.find_by(name: "Carroll County")
montgomery = County.find_by(name: "Montgomery County")
arlington = County.find_by(name: "Arlington County")

sign_23 = Product.find_by(style_number: "23")
sign_25 = Product.find_by(style_number: "25")
sign_26 = Product.find_by(style_number: "26")
sign_31 = Product.find_by(style_number: "31")
sign_47 = Product.find_by(style_number: "47")
sign_48 = Product.find_by(style_number: "48")
sign_49 = Product.find_by(style_number: "49")
sign_50 = Product.find_by(style_number: "50")
sign_51 = Product.find_by(style_number: "51")
sign_61 = Product.find_by(style_number: "61")

ProductCounty.create!(product_id: sign_47.id, county_id: baltimore.id)
ProductCounty.create!(product_id: sign_48.id, county_id: baltimore.id)
ProductCounty.create!(product_id: sign_49.id, county_id: baltimore.id)
ProductCounty.create!(product_id: sign_50.id, county_id: carroll.id)
ProductCounty.create!(product_id: sign_51.id, county_id: carroll.id)
ProductCounty.create!(product_id: sign_31.id, county_id: arlington.id)
ProductCounty.create!(product_id: sign_61.id, county_id: montgomery.id)


# Create the only separate category we have at the moment, and the relevant associations

Category.destroy_all

Category.create(name: "wetland_stream_buffer")
c1 = Category.first

ProductCategory.create!(product_id: sign_23.id, category_id: c1.id)
ProductCategory.create!(product_id: sign_25.id, category_id: c1.id)
ProductCategory.create!(product_id: sign_26.id, category_id: c1.id)
