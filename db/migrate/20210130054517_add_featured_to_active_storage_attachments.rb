class AddFeaturedToActiveStorageAttachments < ActiveRecord::Migration[6.0]
  def change
    add_column :active_storage_attachments, :featured, :boolean
  end
end
