# == Schema Information
#
# Table name: billing_customers
#
#  id           :bigint           not null, primary key
#  name         :string           not null
#  address      :text             not null
#  city         :string           not null
#  state        :string           not null
#  email        :string           not null
#  zip_code     :string           not null
#  phone_number :string
#  tax_exempt   :boolean          default(FALSE), not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class BillingCustomer < ApplicationRecord
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :state, inclusion: { in:  }




    STATES = [ ["AK"], 
                ["AL"],
                ["AR"],
                ["AS"],
                ["AZ"],
                ["CA"],
                ["CO"],
                ["CT"],
                ["DC"],
                ["DE"],
                ["FL"],
                ["GA"],
                ["GU"],
                ["HI"],
                ["IA"],
                ["ID"],
                ["IL"],
                ["IN"],
                ["KS"],
                ["KY"],
                ["LA"],
                ["MA"],
                ["MD"],
                ["ME"],
                ["MI"],
                ["MN"],
                ["MO"],
                ["MS"],
                ["MT"],
                ["NC"],
                ["ND"],
                ["NE"],
                ["NH"],
                ["NJ"],
                ["NM"],
                ["NV"],
                ["NY"],
                ["OH"],
                ["OK"],
                ["OR"],
                ["PA"],
                ["PR"],
                ["RI"],
                ["SC"],
                ["SD"],
                ["TN"],
                ["TX"],
                ["UT"],
                ["VA"],
                ["VI"],
                ["VT"],
                ["WA"],
                ["WI"],
                ["WV"],
                ["WY"] ]
end
