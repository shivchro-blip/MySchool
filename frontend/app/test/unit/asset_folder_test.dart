import 'package:flutter_test/flutter_test.dart';
import 'package:yadhum/utils/asset_folder.dart';

void main() {
  group('AssetFolder.toFolder', () {
    test('english class +1', () {
      expect(AssetFolder.toFolder('+1', 'english'), 'Class_11/English');
    });

    test('english class +2', () {
      expect(AssetFolder.toFolder('+2', 'english'), 'Class_12/English');
    });

    test('computer-applications maps to ComputerApplications (no stray hyphen)', () {
      expect(AssetFolder.toFolder('+1', 'computer-applications'),
          'Class_11/ComputerApplications');
    });

    test('computer-science maps to ComputerScience', () {
      expect(AssetFolder.toFolder('+2', 'computer-science'),
          'Class_12/ComputerScience');
    });

    test('unknown slug falls back to capitalize-first-letter', () {
      expect(AssetFolder.toFolder('+1', 'maths'), 'Class_11/Maths');
    });

    test('unknown classLevel passes through unchanged', () {
      expect(AssetFolder.toFolder('+3', 'english'), '+3/English');
    });
  });
}
