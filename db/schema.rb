# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_10_195528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "billing_customers", force: :cascade do |t|
    t.string "name", null: false
    t.text "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "email", null: false
    t.string "zip_code", null: false
    t.string "phone_number"
    t.boolean "tax_exempt", default: false, null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_billing_customers_on_name"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "counties", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name"], name: "index_counties_on_name", unique: true
  end

  create_table "order_quantities", force: :cascade do |t|
    t.integer "product_id", null: false
    t.integer "order_id", null: false
    t.integer "quantity", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["order_id"], name: "index_order_quantities_on_order_id"
    t.index ["product_id"], name: "index_order_quantities_on_product_id"
  end

  create_table "orders", force: :cascade do |t|
    t.integer "billing_customer_id", null: false
    t.integer "shipping_customer_id", null: false
    t.integer "shipping_cost", default: 1000, null: false
    t.integer "tax_cost", null: false
    t.integer "unit_price", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["billing_customer_id"], name: "index_orders_on_billing_customer_id"
    t.index ["shipping_customer_id"], name: "index_orders_on_shipping_customer_id"
  end

  create_table "product_categories", force: :cascade do |t|
    t.integer "category_id", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "product_counties", force: :cascade do |t|
    t.integer "county_id", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name", null: false
    t.string "size", null: false
    t.string "material", null: false
    t.text "description"
    t.string "style_number"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["name", "id"], name: "index_products_on_name_and_id"
  end

  create_table "shipping_customers", force: :cascade do |t|
    t.string "company_name", null: false
    t.text "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip_code", null: false
    t.string "phone_number"
    t.text "attn"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["company_name"], name: "index_shipping_customers_on_company_name"
  end

end
