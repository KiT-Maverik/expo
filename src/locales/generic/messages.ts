const en = {
  errors: {
    accessDenied: "Your access to this page is forbidden.",
    emptyTitle: "Please, enter a title",
    file: {
      chooseImage: "Choose an image",
      sizeMax: (size: string) => `The maximum allowed file size is ${size}`,
      typeAllowed: (whitelist: string[]) =>
        `Allowed file types are: ${whitelist.join(", ")}`,
    },
    generic: "Something went wrong.",
  },
  callToAction: {
    refresh: "Please, refresh the page.",
  },
  info: {
    copied: "Copied to clipboard",
    loading: "Loading",
    loadingCompleted: "Loading completed",
    saving: "Saving...",
    saved: "Saved",
  },
  entity: {
    accept: {
      inProgress: (entity: string) => `Accepting ${entity}`,
      failed: (entity: string) => `Failed to accept ${entity}`,
      completed: (entity: string) => `${entity} accepted`,
    },
    activation: {
      inProgress: (entity: string) => `Activating ${entity}`,
      failed: (entity: string) => `Failed to activate ${entity}`,
      completed: (entity: string) => `${entity} activated`,
    },
    cancel: {
      inProgress: (entity: string) => `Cancelling ${entity}`,
      failed: (entity: string) => `Failed to cancel ${entity}`,
      completed: (entity: string) => `${entity} cancelled`,
    },
    change: {
      inProgress: (entity: string) => `Changing ${entity}`,
      failed: (entity: string) => `Failed to change ${entity}`,
      completed: (entity: string) => `${entity} changed`,
    },
    confirm: {
      inProgress: (entity: string) => `Confirming ${entity}`,
      failed: (entity: string) => `Failed to confirm ${entity}`,
      completed: (entity: string) => `${entity} confirmed`,
    },
    copying: {
      inProgress: (entity: string) => `Copying ${entity}`,
      failed: (entity: string) => `Failed to copy ${entity}`,
      completed: (entity: string) => `${entity} copied`,
    },
    create: {
      inProgress: (entity: string) => `Creating ${entity}`,
      failed: (entity: string) => `Failed to create ${entity}`,
      completed: (entity: string) => `${entity} created`,
    },
    delete: {
      inProgress: (entity: string) => `Deleting ${entity}`,
      failed: (entity: string) => `Failed to delete ${entity}`,
      completed: (entity: string) => `${entity} deleted`,
    },
    discard: {
      inProgress: (entity: string) => `Discarding ${entity}`,
      failed: (entity: string) => `Failed to discard ${entity}`,
      completed: (entity: string) => `${entity} discarded`,
    },
    download: {
      inProgress: (entity: string) => `Downloading ${entity}`,
      failed: (entity: string) => `Failed to download ${entity}`,
      completed: (entity: string) => `${entity} downloaded`,
    },
    load: {
      inProgress: (entity: string) => `Loading ${entity}`,
      failed: (entity: string) => `Failed to load ${entity}`,
      completed: (entity: string) => `${entity} loaded`,
    },
    publish: {
      inProgress: (entity: string) => `Publishing ${entity}`,
      failed: (entity: string) => `Failed to publish ${entity}`,
      completed: (entity: string) => `${entity} published`,
    },
    remove: {
      inProgress: (entity: string) => `Removing ${entity}`,
      failed: (entity: string) => `Failed to remove ${entity}`,
      completed: (entity: string) => `${entity} removed`,
    },
    rename: {
      inProgress: (entity: string) => `Renaming ${entity}`,
      failed: (entity: string) => `Failed to rename ${entity}`,
      completed: (entity: string) => `${entity} renamed`,
    },
    replace: {
      inProgress: (entity: string) => `Replacing ${entity}`,
      failed: (entity: string) => `Failed to replace ${entity}`,
      completed: (entity: string) => `${entity} replaced`,
    },
    republish: {
      inProgress: (entity: string) => `Republishing ${entity}`,
      failed: (entity: string) => `Failed to republish ${entity}`,
      completed: (entity: string) => `${entity} republished`,
    },
    resend: {
      inProgress: (entity: string) => `Resending ${entity}`,
      failed: (entity: string) => `Failed to resend ${entity}`,
      completed: (entity: string) => `${entity} resent`,
    },
    reset: {
      inProgress: (entity: string) => `Resetting ${entity}`,
      failed: (entity: string) => `Failed to reset ${entity}`,
      completed: (entity: string) => `${entity} reset`,
    },
    revoke: {
      inProgress: (entity: string) => `Revoking ${entity}`,
      failed: (entity: string) => `Failed to revoke ${entity}`,
      completed: (entity: string) => `${entity} revoked`,
    },
    save: {
      inProgress: (entity: string) => `Saving ${entity}`,
      failed: (entity: string) => `Failed to save ${entity}`,
      completed: (entity: string) => `${entity} saved`,
    },
    send: {
      inProgress: (entity: string) => `Sending ${entity}`,
      failed: (entity: string) => `Failed to send ${entity}`,
      completed: (entity: string) => `${entity} sent`,
    },
    update: {
      inProgress: (entity: string) => `Updating ${entity}`,
      failed: (entity: string) => `Failed to update ${entity}`,
      completed: (entity: string) => `${entity} updated`,
    },
    withdraw: {
      inProgress: (entity: string) => `Withdrawing ${entity}`,
      failed: (entity: string) => `Failed to withdraw ${entity}`,
      completed: (entity: string) => `${entity} withdrawn`,
    },
  },
};

export type MessagesLocale = typeof en;

const ua: MessagesLocale = {
  errors: {
    accessDenied: "Ваш доступ до цієї сторінки заборонений.",
    emptyTitle: "Будь ласка, введіть заголовок",
    file: {
      chooseImage: "Виберіть зображення",
      sizeMax: (size: string) =>
        `Максимально допустимий розмір файлу - ${size}`,
      typeAllowed: (whitelist: string[]) =>
        `Дозволені типи файлів: ${whitelist.join(", ")}`,
    },
    generic: "Щось пішло не так.",
  },
  callToAction: {
    refresh: "Будь ласка, оновіть сторінку.",
  },
  info: {
    copied: "Скопійовано до буфера обміну",
    loading: "Завантаження",
    loadingCompleted: "Завантаження завершено",
    saving: "Збереження...",
    saved: "Збережено",
  },
  entity: {
    accept: {
      inProgress: (entity: string) => `Приймається ${entity}`,
      failed: (entity: string) => `Не вдалося прийняти ${entity}`,
      completed: (entity: string) => `${entity} прийнято`,
    },
    activation: {
      inProgress: (entity: string) => `Активується ${entity}`,
      failed: (entity: string) => `Не вдалося активувати ${entity}`,
      completed: (entity: string) => `${entity} активовано`,
    },
    cancel: {
      inProgress: (entity: string) => `Скасовується ${entity}`,
      failed: (entity: string) => `Не вдалося скасувати ${entity}`,
      completed: (entity: string) => `${entity} скасовано`,
    },
    change: {
      inProgress: (entity: string) => `Змінюється ${entity}`,
      failed: (entity: string) => `Не вдалося змінити ${entity}`,
      completed: (entity: string) => `${entity} змінено`,
    },
    confirm: {
      inProgress: (entity: string) => `Підтверджується ${entity}`,
      failed: (entity: string) => `Не вдалося підтвердити ${entity}`,
      completed: (entity: string) => `${entity} підтверджено`,
    },
    copying: {
      inProgress: (entity: string) => `Копіюється ${entity}`,
      failed: (entity: string) => `Не вдалося скопіювати ${entity}`,
      completed: (entity: string) => `${entity} скопійовано`,
    },
    create: {
      inProgress: (entity: string) => `Створюється ${entity}`,
      failed: (entity: string) => `Не вдалося створити ${entity}`,
      completed: (entity: string) => `${entity} створено`,
    },
    delete: {
      inProgress: (entity: string) => `Видаляється ${entity}`,
      failed: (entity: string) => `Не вдалося видалити ${entity}`,
      completed: (entity: string) => `${entity} видалено`,
    },
    discard: {
      inProgress: (entity: string) => `Відхиляється ${entity}`,
      failed: (entity: string) => `Не вдалося відхилити ${entity}`,
      completed: (entity: string) => `${entity} відхилено`,
    },
    download: {
      inProgress: (entity: string) => `Завантажується ${entity}`,
      failed: (entity: string) => `Не вдалося завантажити ${entity}`,
      completed: (entity: string) => `${entity} завантажено`,
    },
    load: {
      inProgress: (entity: string) => `Завантажується ${entity}`,
      failed: (entity: string) => `Не вдалося завантажити ${entity}`,
      completed: (entity: string) => `${entity} завантажено`,
    },
    publish: {
      inProgress: (entity: string) => `Публікується ${entity}`,
      failed: (entity: string) => `Не вдалося опублікувати ${entity}`,
      completed: (entity: string) => `${entity} опубліковано`,
    },
    remove: {
      inProgress: (entity: string) => `Видаляється ${entity}`,
      failed: (entity: string) => `Не вдалося видалити ${entity}`,
      completed: (entity: string) => `${entity} видалено`,
    },
    rename: {
      inProgress: (entity: string) => `Перейменовується ${entity}`,
      failed: (entity: string) => `Не вдалося перейменувати ${entity}`,
      completed: (entity: string) => `${entity} перейменовано`,
    },
    replace: {
      inProgress: (entity: string) => `Замінюється ${entity}`,
      failed: (entity: string) => `Не вдалося замінити ${entity}`,
      completed: (entity: string) => `${entity} замінено`,
    },
    republish: {
      inProgress: (entity: string) => `Перепубліковується ${entity}`,
      failed: (entity: string) => `Не вдалося перепублікувати ${entity}`,
      completed: (entity: string) => `${entity} перепубліковано`,
    },
    resend: {
      inProgress: (entity: string) => `Відправляється знову ${entity}`,
      failed: (entity: string) => `Не вдалося відправити знову ${entity}`,
      completed: (entity: string) => `${entity} відправлено повторно`,
    },
    reset: {
      inProgress: (entity: string) => `Скидається ${entity}`,
      failed: (entity: string) => `Не вдалося скинути ${entity}`,
      completed: (entity: string) => `${entity} скинуто`,
    },
    revoke: {
      inProgress: (entity: string) => `Відкликається ${entity}`,
      failed: (entity: string) => `Не вдалося відкликати ${entity}`,
      completed: (entity: string) => `${entity} відкликано`,
    },
    save: {
      inProgress: (entity: string) => `Зберігається ${entity}`,
      failed: (entity: string) => `Не вдалося зберегти ${entity}`,
      completed: (entity: string) => `${entity} збережено`,
    },
    send: {
      inProgress: (entity: string) => `Надсилається ${entity}`,
      failed: (entity: string) => `Не вдалося надіслати ${entity}`,
      completed: (entity: string) => `${entity} надіслано`,
    },
    update: {
      inProgress: (entity: string) => `Оновлюється ${entity}`,
      failed: (entity: string) => `Не вдалося оновити ${entity}`,
      completed: (entity: string) => `${entity} оновлено`,
    },
    withdraw: {
      inProgress: (entity: string) => `Виводиться ${entity}`,
      failed: (entity: string) => `Не вдалося вивести ${entity}`,
      completed: (entity: string) => `${entity} виведено`,
    },
  },
};

export const messages = { en, ua };
