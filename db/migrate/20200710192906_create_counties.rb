class CreateCounties < ActiveRecord::Migration[6.0]
  def change
    create_table :counties do |t|
      t.string :name, null: false
      t.timestamps
    end
    add_index :counties, :name, unique: true
  end
end