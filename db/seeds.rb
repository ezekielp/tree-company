# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

Product.destroy_all

sign_19 = Product.create(name: "Reforestation Project", size: "11x15", material: ".05g HDPE", description: "", style_number: "19")

file_19 = open('https://tree-company-seeds.s3.amazonaws.com/style19.gif')

sign_19.image.attach(io: file_19, filename: 'style19.gif')


sign_21 = Product.create(name: "Forest Retention Area", size: "11x15", material: ".05g HDPE", description: "", style_number: "21")

file_21 = open('https://tree-company-seeds.s3.amazonaws.com/style21.gif')

sign_21.image.attach(io: file_21, filename: 'style21.gif')


sign_22 = Product.create(name: "Specimen Tree", size: "11x15", material: ".05g HDPE", description: "", style_number: "22")

file_22 = open('https://tree-company-seeds.s3.amazonaws.com/style22.gif')

sign_22.image.attach(io: file_22, filename: 'style22.gif')


sign_23 = Product.create(name: "Wetland Protection Area", size: "11x15", material: ".05g HDPE", description: "", style_number: "23")

file_23 = open('https://tree-company-seeds.s3.amazonaws.com/style23.gif')

sign_23.image.attach(io: file_23, filename: 'style23.gif')


sign_24 = Product.create(name: "Streamside Forest Buffer — Chesapeake Bay", size: "11x15", material: ".05g HDPE", description: "", style_number: "24")

file_24 = open('https://tree-company-seeds.s3.amazonaws.com/style24.gif')

sign_24.image.attach(io: file_24, filename: 'style24.gif')


sign_25 = Product.create(name: "Streamside Forest Buffer — Generic", size: "11x15", material: ".05g HDPE", description: "", style_number: "25")

file_25 = open('https://tree-company-seeds.s3.amazonaws.com/style25.gif')

sign_25.image.attach(io: file_25, filename: 'style25.gif')


sign_26 = Product.create(name: "Chesapeake Bay Critical Area Buffer", size: "11x15", material: ".05g HDPE", description: "", style_number: "26")

file_26 = open('https://tree-company-seeds.s3.amazonaws.com/style26.png')

sign_26.image.attach(io: file_26, filename: 'style26.png')


sign_31 = Product.create(name: "Tree Preservation Area", size: "12x18", material: ".05g HDPE", description: "", style_number: "31")

file_31 = open('https://tree-company-seeds.s3.amazonaws.com/style31.gif')

sign_31.image.attach(io: file_31, filename: 'style31.gif')


sign_35 = Product.create(name: "Meadow Restoration", size: "11x15", material: ".05g HDPE", description: "", style_number: "35")

file_35 = open('https://tree-company-seeds.s3.amazonaws.com/style35.gif')

sign_35.image.attach(io: file_35, filename: 'style35.gif')


sign_47 = Product.create(name: "Forest Buffer", size: "6x8", material: ".032g aluminum", description: "", style_number: "47")

file_47 = open('https://tree-company-seeds.s3.amazonaws.com/style47.gif')

sign_47.image.attach(io: file_47, filename: 'style47.gif')


sign_48 = Product.create(name: "Forest Conservation Area", size: "6x8", material: ".032g aluminum", description: "", style_number: "48")

file_48 = open('https://tree-company-seeds.s3.amazonaws.com/style48.gif')

sign_48.image.attach(io: file_48, filename: 'style48.gif')


sign_49 = Product.create(name: "Chesapeake Bay Critical Area", size: "6x8", material: ".032g aluminum", description: "", style_number: "49")

file_49 = open('https://tree-company-seeds.s3.amazonaws.com/style49.gif')

sign_49.image.attach(io: file_49, filename: 'style49.gif')


sign_50 = Product.create(name: "Water Resource Protection Area", size: "6x8", material: ".032g aluminum", description: "", style_number: "50")

file_50 = open('https://tree-company-seeds.s3.amazonaws.com/style50.gif')

sign_50.image.attach(io: file_50, filename: 'style50.gif')


sign_51 = Product.create(name: "Forest Conservation Area - Carroll County", size: "6x8", material: ".032g aluminum", description: "", style_number: "51")

file_51 = open('https://tree-company-seeds.s3.amazonaws.com/style51.gif')

sign_51.image.attach(io: file_51, filename: 'style51.gif')


sign_61 = Product.create(name: "Forest Conservation Area - Montgomery County", size: "5.5x8", material: ".032g aluminum", description: "", style_number: "61")

file_61 = open('https://tree-company-seeds.s3.amazonaws.com/style61.jpg')

sign_61.image.attach(io: file_61, filename: 'style61.jpg')
