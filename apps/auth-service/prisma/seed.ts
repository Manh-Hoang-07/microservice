import { PrismaClient } from '../src/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const BCRYPT_ROUNDS = 12;
const DEFAULT_PASSWORD = 'Password@123';

interface SeedUser {
  username: string;
  email: string;
  phone: string;
  name: string;
  status: string;
  image: string;
  profile: {
    birthday: Date;
    gender: string;
    address: string;
    about: string;
  };
}

const users: SeedUser[] = [
  {
    username: 'admin',
    email: 'admin.comic@gmail.com',
    phone: '+84901000001',
    name: 'System Admin',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=admin',
    profile: {
      birthday: new Date('1990-01-15'),
      gender: 'male',
      address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
      about: 'System administrator of Comic Platform.',
    },
  },
  {
    username: 'moderator',
    email: 'mod.comic@gmail.com',
    phone: '+84901000002',
    name: 'Nguyễn Văn Mod',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=mod',
    profile: {
      birthday: new Date('1992-05-20'),
      gender: 'male',
      address: '45 Lê Lợi, Quận 1, TP.HCM',
      about: 'Content moderator.',
    },
  },
  {
    username: 'tranthimai',
    email: 'mai.tran@gmail.com',
    phone: '+84901000003',
    name: 'Trần Thị Mai',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=mai',
    profile: {
      birthday: new Date('1995-03-08'),
      gender: 'female',
      address: '78 Trần Hưng Đạo, Quận 5, TP.HCM',
      about: 'Manga enthusiast and translator.',
    },
  },
  {
    username: 'levanhoang',
    email: 'hoang.le@gmail.com',
    phone: '+84901000004',
    name: 'Lê Văn Hoàng',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=hoang',
    profile: {
      birthday: new Date('1998-11-25'),
      gender: 'male',
      address: '12 Phạm Văn Đồng, Thủ Đức, TP.HCM',
      about: 'Comic artist and reader.',
    },
  },
  {
    username: 'phamthilan',
    email: 'lan.pham@gmail.com',
    phone: '+84901000005',
    name: 'Phạm Thị Lan',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=lan',
    profile: {
      birthday: new Date('2000-07-14'),
      gender: 'female',
      address: '56 Hai Bà Trưng, Quận 3, TP.HCM',
      about: 'Webtoon lover.',
    },
  },
  {
    username: 'nguyenvanduc',
    email: 'duc.nguyen@gmail.com',
    phone: '+84901000006',
    name: 'Nguyễn Văn Đức',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=duc',
    profile: {
      birthday: new Date('1997-09-30'),
      gender: 'male',
      address: '99 Điện Biên Phủ, Bình Thạnh, TP.HCM',
      about: 'Full-stack developer and comic collector.',
    },
  },
  {
    username: 'vothihuong',
    email: 'huong.vo@gmail.com',
    phone: '+84901000007',
    name: 'Võ Thị Hương',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=huong',
    profile: {
      birthday: new Date('1999-12-01'),
      gender: 'female',
      address: '34 Nguyễn Trãi, Quận 1, TP.HCM',
      about: 'Illustrator and manhwa fan.',
    },
  },
  {
    username: 'dangquocbao',
    email: 'bao.dang@gmail.com',
    phone: '+84901000008',
    name: 'Đặng Quốc Bảo',
    status: 'active',
    image: 'https://i.pravatar.cc/150?u=bao',
    profile: {
      birthday: new Date('1993-04-18'),
      gender: 'male',
      address: '67 Võ Văn Tần, Quận 3, TP.HCM',
      about: 'Comic reviewer and blogger.',
    },
  },
  {
    username: 'locked_user',
    email: 'locked.comic@gmail.com',
    phone: '+84901000009',
    name: 'Trương Văn Khóa',
    status: 'locked',
    image: 'https://i.pravatar.cc/150?u=locked',
    profile: {
      birthday: new Date('1996-06-10'),
      gender: 'male',
      address: '21 Lý Tự Trọng, Quận 1, TP.HCM',
      about: 'Account locked for policy violation.',
    },
  },
  {
    username: 'inactive_user',
    email: 'inactive.comic@gmail.com',
    phone: '+84901000010',
    name: 'Bùi Thị Ngọc',
    status: 'inactive',
    image: 'https://i.pravatar.cc/150?u=inactive',
    profile: {
      birthday: new Date('2001-02-28'),
      gender: 'female',
      address: '88 Cách Mạng Tháng 8, Quận 10, TP.HCM',
      about: 'Inactive account.',
    },
  },
];

async function main() {
  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, BCRYPT_ROUNDS);
  const now = new Date();

  console.log(`Seeding ${users.length} users with password: ${DEFAULT_PASSWORD}`);

  for (const u of users) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (existing) {
      console.log(`  ⏭ ${u.username} (${u.email}) already exists, skipping`);
      continue;
    }

    await prisma.user.create({
      data: {
        username: u.username,
        email: u.email,
        phone: u.phone,
        password: hashedPassword,
        name: u.name,
        status: u.status,
        image: u.image,
        email_verified_at: u.status === 'active' ? now : null,
        last_login_at: u.status === 'active' ? now : null,
        profile: {
          create: {
            birthday: u.profile.birthday,
            gender: u.profile.gender,
            address: u.profile.address,
            about: u.profile.about,
          },
        },
      },
    });

    console.log(`  ✔ ${u.username} (${u.email}) — ${u.status}`);
  }

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
