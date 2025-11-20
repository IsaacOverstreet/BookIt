import { Test, TestingModule } from '@nestjs/testing';
import { ExperiencesService } from './experiences.service';
import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ExperiencesService', () => {
  let service: ExperiencesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExperiencesService,
        {
          provide: PrismaService,
          useValue: {
            experience: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
              count: jest.fn(),
            },
          },
        },
      ],
    }).compile();
    service = module.get<ExperiencesService>(ExperiencesService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //get all
  it('return all experience and totalpage in the db', async () => {
    const mockdata = [
      { id: '1', title: 'Frontend Dev' },
      { id: '2', title: 'Backend Dev' },
      { id: '3', title: 'Frontend Dev' },
      { id: '4', title: 'Backend Dev' },
    ];
    const totalMockData = 7;
    (prisma.experience.findMany as jest.Mock).mockResolvedValue(mockdata);
    (prisma.experience.count as jest.Mock).mockResolvedValue(totalMockData);

    const skip = 0;
    const take = 2;

    const result = await service.getAllExperiences({ skip, take });

    expect(result.experience).toEqual(mockdata);
    expect(result.totalPage).toEqual(4);
    expect(prisma.experience.findMany).toHaveBeenCalledWith({
      skip,
      take,
      orderBy: { title: 'asc' },
    });
    expect(prisma.experience.count).toHaveBeenCalled();
  });

  //Get by Id
  it('return experience by id', async () => {
    const mockdata = { id: '1', title: 'Frontend Dev' };
    (prisma.experience.findUnique as jest.Mock).mockResolvedValue(mockdata);

    const id = '1';
    const result = await service.getExperienceById(id);

    expect(result).toEqual({ ...mockdata, tax: 0.075 });
    expect(prisma.experience.findUnique).toHaveBeenCalledWith({
      where: { id: id },
      include: {
        dates: {
          include: {
            times: {
              include: { slots: true },
            },
          },
        },
      },
    });
  });

  //throw error if experience not find by Id
  it('return  BadrequestError  if experience not found by Id', async () => {
    (prisma.experience.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.getExperienceById('invalid')).rejects.toThrow(
      BadRequestException,
    );
  });

  // test search
  it('return searched experience', async () => {
    const mockdata = [
      { id: '1', title: 'Frontend ' },
      { id: '3', title: 'Frontend ' },
    ];

    (prisma.experience.findMany as jest.Mock).mockResolvedValue(mockdata);

    const search = 'Frontend';

    const result = await service.getExperienceBySearch('Frontend');

    expect(result).toEqual(mockdata);
    expect(prisma.experience.findMany).toHaveBeenCalledWith({
      where: {
        title: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
  });
});
