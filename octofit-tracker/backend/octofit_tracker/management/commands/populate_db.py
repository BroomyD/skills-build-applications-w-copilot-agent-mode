from django.core.management.base import BaseCommand
from octofit_tracker import models

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        models.User.objects.all().delete()
        models.Team.objects.all().delete()
        models.Activity.objects.all().delete()
        models.Leaderboard.objects.all().delete()
        models.Workout.objects.all().delete()

        # Create teams
        marvel = models.Team.objects.create(name='Team Marvel')
        dc = models.Team.objects.create(name='Team DC')

        # Create users
        ironman = models.User.objects.create(name='Iron Man', email='ironman@marvel.com', team=marvel)
        captain = models.User.objects.create(name='Captain America', email='captain@marvel.com', team=marvel)
        batman = models.User.objects.create(name='Batman', email='batman@dc.com', team=dc)
        superman = models.User.objects.create(name='Superman', email='superman@dc.com', team=dc)

        # Create activities
        models.Activity.objects.create(user=ironman, type='Run', duration=30)
        models.Activity.objects.create(user=batman, type='Swim', duration=45)

        # Create workouts
        models.Workout.objects.create(user=ironman, description='Chest day', duration=60)
        models.Workout.objects.create(user=superman, description='Leg day', duration=50)

        # Create leaderboard
        models.Leaderboard.objects.create(user=ironman, score=100)
        models.Leaderboard.objects.create(user=superman, score=90)

        self.stdout.write(self.style.SUCCESS('Database populated with test data.'))
